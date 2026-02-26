const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const createApiUrl = (path) => {
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }

  return path;
};

export const getYoutubeVideos = async ({
  pageSize = 24,
  livestreamPageSize = 12,
} = {}) => {
  const params = new URLSearchParams({
    pageSize: String(pageSize),
    livestreamPageSize: String(livestreamPageSize),
  });

  const response = await fetch(createApiUrl(`/api/youtube/videos?${params}`));

  if (!response.ok) {
    throw new Error(
      `YouTube API request failed with status ${response.status}`,
    );
  }

  const data = await response.json();

  return {
    items: Array.isArray(data.items) ? data.items : [],
    livestreamItems: Array.isArray(data.livestreamItems)
      ? data.livestreamItems
      : [],
    liveNowItems: Array.isArray(data.liveNowItems) ? data.liveNowItems : [],
  };
};
