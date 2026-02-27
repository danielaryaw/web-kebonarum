const { corsMiddleware, runMiddleware } = require("./cors");

export default async (req, res) => {
  await runMiddleware(req, res, corsMiddleware);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.status(200).json({ status: "ok" });
};
