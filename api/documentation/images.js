const { corsMiddleware, runMiddleware } = require("../cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const {
  hasGoogleDriveApiKey,
  logDriveError,
  fetchDriveFolderImagePage,
} = require("../../backend/services/googleDriveApi");

module.exports = async (req, res) => {
  await runMiddleware(req, res, corsMiddleware);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id: folderId } = req.query;
  const requestedPageSize = Number(req.query.pageSize || 12);
  const pageSize = Number.isFinite(requestedPageSize)
    ? Math.max(1, Math.min(requestedPageSize, 50))
    : 12;
  const pageToken = String(req.query.pageToken || "");

  if (!folderId || !hasGoogleDriveApiKey()) {
    return res.json({
      images: [],
      nextPageToken: "",
      pageSize,
      prefetchedNextPage: null,
    });
  }

  try {
    const currentPage = await fetchDriveFolderImagePage({
      folderId,
      pageSize,
      pageToken,
    });

    let prefetchedNextPage = null;

    if (currentPage.nextPageToken) {
      try {
        const nextPage = await fetchDriveFolderImagePage({
          folderId,
          pageSize,
          pageToken: currentPage.nextPageToken,
        });

        prefetchedNextPage = {
          images: nextPage.images,
          nextPageToken: nextPage.nextPageToken,
        };
      } catch (prefetchError) {
        logDriveError({
          context: "documentation.images.prefetch",
          error: prefetchError,
        });
      }
    }

    return res.json({
      images: currentPage.images,
      nextPageToken: currentPage.nextPageToken,
      pageSize,
      prefetchedNextPage,
    });
  } catch (error) {
    logDriveError({
      context: "documentation.images",
      error,
    });
    return res.status(502).json({
      message: "Failed to fetch images from Google Drive",
      images: [],
      nextPageToken: "",
      pageSize,
      prefetchedNextPage: null,
    });
  }
};
