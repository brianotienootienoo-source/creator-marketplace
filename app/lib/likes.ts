const STORAGE_KEY = "creator_likes";

function getStoredLikes(): Record<string, number[]> {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function saveLikes(data: Record<string, number[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function toggleLike(postId: number, creatorSlug: string) {
  const data = getStoredLikes();

  if (!data[creatorSlug]) {
    data[creatorSlug] = [];
  }

  const index = data[creatorSlug].indexOf(postId);

  if (index === -1) {
    data[creatorSlug].push(postId);
  } else {
    data[creatorSlug].splice(index, 1);
  }

  saveLikes(data);
  return data;
}

export function isPostLiked(postId: number, creatorSlug: string) {
  const data = getStoredLikes();
  return data?.[creatorSlug]?.includes(postId) ?? false;
}