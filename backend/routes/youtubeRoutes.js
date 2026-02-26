const express = require("express");
const {
  hasYoutubeConfig,
  hasYoutubeChannelId,
  logYoutubeError,
  fetchChannelVideos,
  fetchPastLivestreams,
  fetchLiveAndUpcomingLivestreams,
  fetchChannelRssVideos,
  splitRssVideosForSections,
} = require("../services/youtubeApi");

const router = express.Router();

router.get("/videos", async (req, res) => {
  const requestedPageSize = Number(req.query.pageSize || 24);
  const requestedLivestreamPageSize = Number(
    req.query.livestreamPageSize || 12,
  );

  const pageSize = Number.isFinite(requestedPageSize)
    ? Math.max(1, Math.min(requestedPageSize, 50))
    : 24;

  const livestreamPageSize = Number.isFinite(requestedLivestreamPageSize)
    ? Math.max(1, Math.min(requestedLivestreamPageSize, 50))
    : 12;

  if (!hasYoutubeConfig() && !hasYoutubeChannelId()) {
    return res.json({
      items: [],
      livestreamItems: [],
      liveNowItems: [],
      pageSize,
      livestreamPageSize,
    });
  }

  const [itemsResult, livestreamResult, liveNowResult] =
    await Promise.allSettled([
      fetchChannelVideos({ pageSize }),
      fetchPastLivestreams({ pageSize: livestreamPageSize }),
      fetchLiveAndUpcomingLivestreams({ pageSize: livestreamPageSize }),
    ]);

  if (itemsResult.status === "rejected") {
    logYoutubeError({
      context: "youtube.videos.items",
      error: itemsResult.reason,
      status: itemsResult.reason?.status,
      details: itemsResult.reason?.details,
    });
  }

  if (livestreamResult.status === "rejected") {
    logYoutubeError({
      context: "youtube.videos.livestreamItems",
      error: livestreamResult.reason,
      status: livestreamResult.reason?.status,
      details: livestreamResult.reason?.details,
    });
  }

  if (liveNowResult.status === "rejected") {
    logYoutubeError({
      context: "youtube.videos.liveNowItems",
      error: liveNowResult.reason,
      status: liveNowResult.reason?.status,
      details: liveNowResult.reason?.details,
    });
  }

  let items = itemsResult.status === "fulfilled" ? itemsResult.value : [];
  let livestreamItems =
    livestreamResult.status === "fulfilled" ? livestreamResult.value : [];
  const liveNowItems =
    liveNowResult.status === "fulfilled" ? liveNowResult.value : [];

  const hasApi403 = [itemsResult, livestreamResult, liveNowResult].some(
    (result) =>
      result.status === "rejected" && Number(result.reason?.status) === 403,
  );

  const shouldUseRssFallback =
    hasYoutubeChannelId() &&
    (hasApi403 || (!items.length && !livestreamItems.length));

  if (shouldUseRssFallback) {
    try {
      const rssVideos = await fetchChannelRssVideos({
        pageSize: Math.max(pageSize, livestreamPageSize * 2),
      });
      const rssSplit = splitRssVideosForSections({
        videos: rssVideos,
        livestreamPageSize,
      });

      if (!items.length) {
        items = rssSplit.items.slice(0, pageSize);
      }

      if (!livestreamItems.length) {
        livestreamItems = rssSplit.livestreamItems;
      }
    } catch (rssError) {
      logYoutubeError({
        context: "youtube.videos.rssFallback",
        error: rssError,
      });
    }
  }

  return res.json({
    items,
    livestreamItems,
    liveNowItems,
    pageSize,
    livestreamPageSize,
  });
});

module.exports = router;
