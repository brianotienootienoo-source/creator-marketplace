export type Post = {
  id: string;
  creatorSlug: string;
  type: "original" | "viral";
  title: string;
  content?: string;
  url?: string;
  platform?: "youtube" | "tiktok" | "instagram";
  likes: number;
  createdAt: number;

  comments?: {
    id: string;
    user: string;
    text: string;
    createdAt: number;
  }[];
};

const STORAGE_KEY = "creator_posts";

/* -----------------------------
   REAL-TIME SYNC (C7)
------------------------------*/

import { broadcastFeedUpdate } from "./feedChannel";

/* -----------------------------
   STORAGE HELPERS
------------------------------*/

export function getPosts(): Post[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function savePosts(posts: Post[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/* -----------------------------
   PLATFORM DETECTION
------------------------------*/

function detectPlatform(
  url: string
): "youtube" | "tiktok" | "instagram" | null {
  if (url.includes("youtube.com") || url.includes("youtu.be")) return "youtube";
  if (url.includes("tiktok.com")) return "tiktok";
  if (url.includes("instagram.com")) return "instagram";
  return null;
}

/* -----------------------------
   POSTS
------------------------------*/

export function getCreatorPosts(slug: string): Post[] {
  return getPosts().filter((p) => p.creatorSlug === slug);
}

/* -----------------------------
   CREATE POSTS
------------------------------*/

export function addOriginalPost(
  creatorSlug: string,
  title: string,
  content: string
) {
  const posts = getPosts();

  const newPost: Post = {
    id: crypto.randomUUID(),
    creatorSlug,
    type: "original",
    title,
    content,
    likes: 0,
    createdAt: Date.now(),
    comments: [],
  };

  posts.unshift(newPost);
  savePosts(posts);
  broadcastFeedUpdate();

  return newPost;
}

export function addViralPostFromUrl(
  creatorSlug: string,
  url: string,
  title?: string
) {
  const posts = getPosts();
  const platform = detectPlatform(url);

  /* SAFE FIX — NO CRASH */
  if (!platform) {
    console.warn("Unsupported platform:", url);

    const fallbackPost: Post = {
      id: crypto.randomUUID(),
      creatorSlug,
      type: "viral",
      title: title || "Unsupported URL",
      url,
      platform: undefined,
      likes: 0,
      createdAt: Date.now(),
      comments: [],
    };

    posts.unshift(fallbackPost);
    savePosts(posts);
    broadcastFeedUpdate();

    return fallbackPost;
  }

  const newPost: Post = {
    id: crypto.randomUUID(),
    creatorSlug,
    type: "viral",
    title: title || `Imported ${platform} post`,
    url,
    platform,
    likes: Math.floor(Math.random() * 500000),
    createdAt: Date.now(),
    comments: [],
  };

  posts.unshift(newPost);
  savePosts(posts);
  broadcastFeedUpdate();

  return newPost;
}

/* -----------------------------
   ENGAGEMENT ACTIONS
------------------------------*/

export function likePost(postId: string) {
  const posts = getPosts();

  const updated = posts.map((p) =>
    p.id === postId ? { ...p, likes: p.likes + 1 } : p
  );

  savePosts(updated);
  broadcastFeedUpdate();

  return updated;
}

export function addComment(postId: string, user: string, text: string) {
  const posts = getPosts();

  const updated = posts.map((p) => {
    if (p.id === postId) {
      const newComment = {
        id: crypto.randomUUID(),
        user,
        text,
        createdAt: Date.now(),
      };

      return {
        ...p,
        comments: [...(p.comments || []), newComment],
      };
    }
    return p;
  });

  savePosts(updated);
  broadcastFeedUpdate();

  return updated;
}

/* =========================================================
   C9-B — CREATOR SCORING ENGINE
=========================================================*/

function getAllCreatorPosts(slug: string) {
  return getPosts().filter((p) => p.creatorSlug === slug);
}

export function getCreatorStats(slug: string) {
  const posts = getAllCreatorPosts(slug);

  const totalPosts = posts.length;
  const totalLikes = posts.reduce((s, p) => s + (p.likes || 0), 0);
  const totalComments = posts.reduce(
    (s, p) => s + (p.comments?.length || 0),
    0
  );

  const viralPosts = posts.filter((p) => p.type === "viral").length;
  const avgLikes = totalPosts === 0 ? 0 : totalLikes / totalPosts;

  const engagementRate =
    totalPosts === 0
      ? 0
      : (totalLikes + totalComments * 2) / totalPosts;

  const latestPost = posts.reduce((latest, p) => {
    return !latest || p.createdAt > latest.createdAt ? p : latest;
  }, null as any);

  const hoursSinceLastPost = latestPost
    ? (Date.now() - latestPost.createdAt) / (1000 * 60 * 60)
    : 999;

  return {
    totalPosts,
    totalLikes,
    totalComments,
    viralPosts,
    avgLikes,
    engagementRate,
    hoursSinceLastPost,
  };
}

export function calculateCreatorScore(slug: string) {
  const stats = getCreatorStats(slug);

  const likeWeight = stats.avgLikes * 0.5;
  const engagementWeight = stats.engagementRate * 0.4;
  const viralWeight = stats.viralPosts * 120;
  const activityWeight = stats.totalPosts * 10;

  const recencyBoost =
    stats.hoursSinceLastPost < 24
      ? 80
      : stats.hoursSinceLastPost < 72
      ? 40
      : 0;

  return Math.round(
    likeWeight +
      engagementWeight +
      viralWeight +
      activityWeight +
      recencyBoost
  );
}

/* 🏆 Creator Tier */
export function getCreatorTier(slug: string) {
  const score = calculateCreatorScore(slug);

  if (score > 1200) return "elite";
  if (score > 700) return "pro";
  if (score > 300) return "rising";
  return "new";
}

export function getRankedCreators(creators: any[]) {
  return [...creators]
    .map((c) => ({
      ...c,
      score: calculateCreatorScore(c.slug),
      tier: getCreatorTier(c.slug),
    }))
    .sort((a, b) => b.score - a.score);
}

/* =========================================================
   💸 C14 — PRICING ENGINE
=========================================================*/

function getBaseCreatorValue(slug: string) {
  const posts = getPosts().filter((p) => p.creatorSlug === slug);

  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);
  const viralBoost = posts.filter((p) => p.type === "viral").length * 300;
  const activityBoost = posts.length * 50;

  return totalLikes * 0.2 + viralBoost + activityBoost;
}

export function getCreatorPrice(slug: string) {
  const baseValue = getBaseCreatorValue(slug);
  const score = calculateCreatorScore(slug);

  const demandMultiplier =
    score > 1000 ? 1.6 :
    score > 500 ? 1.3 :
    score > 200 ? 1.1 :
    0.9;

  return Math.round(baseValue * demandMultiplier);
}

/* 📈 Trend */
export function getCreatorTrend(slug: string) {
  const posts = getPosts().filter((p) => p.creatorSlug === slug);

  if (posts.length < 2) return "stable";

  const recent = posts.slice(-3);
  const older = posts.slice(0, -3);

  const recentAvg =
    recent.reduce((s, p) => s + p.likes, 0) / recent.length;

  const olderAvg =
    older.length > 0
      ? older.reduce((s, p) => s + p.likes, 0) / older.length
      : recentAvg;

  if (recentAvg > olderAvg * 1.3) return "rising";
  if (recentAvg < olderAvg * 0.7) return "declining";

  return "stable";
}

/* =========================================================
   🚀 C15-C STEP 2 — UI ADAPTER LAYER
=========================================================*/

/**
 * ⏱️ Post age in hours
 */
function getPostAgeHours(post: Post) {
  return (Date.now() - post.createdAt) / (1000 * 60 * 60);
}

/**
 * ⚡ Engagement velocity
 */
function getPostEngagementVelocity(post: Post) {
  const age = Math.max(getPostAgeHours(post), 0.1);
  return (post.likes || 0) / age;
}

/**
 * 🔥 Virality state
 */
export function getViralityState(post: Post) {
  const velocity = getPostEngagementVelocity(post);
  const age = getPostAgeHours(post);
  const commentCount = post.comments?.length || 0;

  const score = velocity + commentCount * 5;

  if (score > 500 && age < 12) return "exploding";
  if (score > 200) return "viral";
  if (score > 80) return "warming";
  if (age > 72 && score < 30) return "decaying";

  return "cold";
}

/**
 * 📊 Post score
 */
export function calculatePostScore(post: Post) {
  const velocity = getPostEngagementVelocity(post);
  const age = getPostAgeHours(post);
  const comments = post.comments?.length || 0;

  const creatorBoost = calculateCreatorScore(post.creatorSlug);

  const decay = Math.max(0.2, 1 - age / 120);

  const score =
    velocity * 2 +
    comments * 10 +
    creatorBoost * 0.1;

  return Math.round(score * decay);
}

/**
 * 📡 Feed score
 */
export function getFeedScore(post: Post) {
  const base = calculatePostScore(post);
  const virality = getViralityState(post);

  const multiplier =
    virality === "exploding"
      ? 2.2
      : virality === "viral"
      ? 1.6
      : virality === "warming"
      ? 1.2
      : virality === "decaying"
      ? 0.7
      : 1;

  return Math.round(base * multiplier);
}

/**
 * 🧩 UI ENRICHMENT LAYER (C15-C STEP 2)
 */
export function enrichPost(post: Post) {
  const virality = getViralityState(post);
  const postScore = calculatePostScore(post);
  const feedScore = getFeedScore(post);

  return {
    ...post,
    ui: {
      virality,
      postScore,
      feedScore,
      engagement:
        (post.likes || 0) + (post.comments?.length || 0) * 2,
      velocity: getPostEngagementVelocity(post),
      isHot: virality === "exploding" || virality === "viral",
      decayLevel:
        getPostAgeHours(post) > 72
          ? "high"
          : getPostAgeHours(post) > 24
          ? "medium"
          : "low",
    },
  };
}

export function getEnrichedPosts() {
  return getPosts().map(enrichPost);
}

export function getRankedFeed() {
  return getPosts()
    .map(enrichPost)
    .sort((a, b) => b.ui.feedScore - a.ui.feedScore);
}