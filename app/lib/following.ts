const KEY = "following_graph";

/**
 * Structure:
 * {
 *   [userId: string]: string[] // creatorSlugs
 * }
 */
type FollowGraph = Record<string, string[]>;

/* -----------------------------
   STORAGE HELPERS
------------------------------*/

function getGraph(): FollowGraph {
  if (typeof window === "undefined") return {};
  return JSON.parse(localStorage.getItem(KEY) || "{}");
}

function saveGraph(graph: FollowGraph) {
  localStorage.setItem(KEY, JSON.stringify(graph));
}

/* -----------------------------
   CORE API (C16 STEP 2)
------------------------------*/

/**
 * Follow a creator
 */
export function followCreator(userId: string, creatorSlug: string) {
  const graph = getGraph();

  const current = graph[userId] || [];

  if (!current.includes(creatorSlug)) {
    graph[userId] = [...current, creatorSlug];
  }

  saveGraph(graph);
  return graph[userId];
}

/**
 * Unfollow a creator
 */
export function unfollowCreator(userId: string, creatorSlug: string) {
  const graph = getGraph();

  const current = graph[userId] || [];

  graph[userId] = current.filter((slug) => slug !== creatorSlug);

  saveGraph(graph);
  return graph[userId];
}

/**
 * Toggle follow state
 */
export function toggleFollow(userId: string, creatorSlug: string) {
  const graph = getGraph();

  const current = graph[userId] || [];

  const updated = current.includes(creatorSlug)
    ? current.filter((s) => s !== creatorSlug)
    : [...current, creatorSlug];

  graph[userId] = updated;

  saveGraph(graph);
  return updated;
}

/**
 * Check follow state
 */
export function isFollowing(userId: string, creatorSlug: string): boolean {
  const graph = getGraph();
  return (graph[userId] || []).includes(creatorSlug);
}

/**
 * Get full following list (new API)
 */
export function getFollowingList(userId: string): string[] {
  const graph = getGraph();
  return graph[userId] || [];
}

/* =========================================================
   🔁 COMPATIBILITY LAYER (fixes your current UI errors)
=========================================================*/

/**
 * Legacy support for existing UI pages
 * (Browse / Following pages still use old function names)
 */

export function getFollowing(userId: string = "default"): string[] {
  return getFollowingList(userId);
}

export function toggleFollowing(
  creatorSlug: string,
  userId: string = "default"
): string[] {
  return toggleFollow(userId, creatorSlug);
}