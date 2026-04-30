import { getPosts, Post } from "./posts";
import { getFeedScore, getViralityState } from "./posts";
import { calculateCreatorScore } from "./posts";
import { getFollowing } from "./following";
import { creators } from "@/app/data/creators";

/* =========================================================
   🧠 CORE FEED ENGINE (C16 → C19-B UPGRADED)
=========================================================*/

/**
 * Enrich post with computed intelligence
 */
function enrichPost(post: Post) {
  const virality = getViralityState(post);
  const feedScore = getFeedScore(post);
  const creatorScore = calculateCreatorScore(post.creatorSlug);

  return {
    ...post,
    ui: {
      virality,
      feedScore,
      creatorScore,
      isHot: virality === "viral" || virality === "exploding",
      engagement:
        (post.likes || 0) + (post.comments?.length || 0) * 5,
      velocity:
        (post.likes || 0) /
        Math.max(1, (Date.now() - post.createdAt) / 3600000),
    },
  };
}

/* =========================================================
   📊 SORT HELPER
=========================================================*/

function sortByFeedScore(posts: any[]) {
  return [...posts].sort((a, b) => b.ui.feedScore - a.ui.feedScore);
}

/* =========================================================
   🌍 GLOBAL FEED
=========================================================*/

export function getGlobalFeed() {
  const posts = getPosts();
  return sortByFeedScore(posts.map(enrichPost));
}

/* =========================================================
   🔥 TRENDING FEED
=========================================================*/

export function getTrendingFeed() {
  const posts = getPosts();

  return posts
    .map(enrichPost)
    .filter((p) => p.ui.virality !== "cold")
    .sort((a, b) => b.ui.engagement - a.ui.engagement);
}

/* =========================================================
   👥 FOLLOWING FEED
=========================================================*/

export function getFollowingFeed(userId?: string) {
  const following = getFollowing();
  const posts = getPosts();

  const filtered = posts.filter((p) =>
    following.includes(p.creatorSlug)
  );

  return sortByFeedScore(filtered.map(enrichPost));
}

/* =========================================================
   👤 CREATOR FEED
=========================================================*/

export function getCreatorFeed(slug: string) {
  const posts = getPosts().filter(
    (p) => p.creatorSlug === slug
  );

  return sortByFeedScore(posts.map(enrichPost));
}

/* =========================================================
   🎯 C18-A — AFFINITY MODEL
=========================================================*/

function getUserAffinityScore(post: any, following: string[]) {
  let score = 0;

  if (following.includes(post.creatorSlug)) {
    score += 50;
  }

  score += (post.likes || 0) * 0.01;
  score += (post.comments?.length || 0) * 2;

  const hoursOld =
    (Date.now() - post.createdAt) / 3600000;

  score += Math.max(0, 24 - hoursOld);

  return score;
}

/* =========================================================
   🧠 C18-B — INTEREST GRAPH
=========================================================*/

function getUserInterestProfile(following: string[]) {
  const profile: Record<string, number> = {};

  creators
    .filter((c) => following.includes(c.name))
    .forEach((creator) => {
      profile[creator.niche] =
        (profile[creator.niche] || 0) + 1;
    });

  return profile;
}

function getCreatorAffinityScore(
  post: any,
  interestProfile: Record<string, number>
) {
  const creator = creators.find(
    (c) => c.slug === post.creatorSlug
  );

  if (!creator) return 0;

  return interestProfile[creator.niche] || 0;
}

/* =========================================================
   🟡 C19-B — ENGAGEMENT PREDICTION
=========================================================*/

function getEngagementPredictionScore(
  post: any,
  following: string[]
) {
  let score = 0;

  if (following.includes(post.creatorSlug)) {
    score += 40;
  }

  score += (post.likes || 0) * 0.02;
  score += (post.comments?.length || 0) * 3;

  const virality = getViralityState(post);
  if (virality === "exploding") score += 50;
  if (virality === "viral") score += 30;
  if (virality === "warming") score += 10;

  const hoursOld =
    (Date.now() - post.createdAt) / 3600000;

  score += Math.max(0, 18 - hoursOld);

  return score;
}

/* =========================================================
   🚀 C20-A — UNIFIED FEED SCORING ENGINE
=========================================================*/

/**
 * SINGLE source of truth for ranking decisions
 */
function getUnifiedFeedScore(
  enriched: any,
  following: string[],
  interestProfile: Record<string, number>
) {
  const baseAffinity = getUserAffinityScore(
    enriched,
    following
  );

  const interestBoost = getCreatorAffinityScore(
    enriched,
    interestProfile
  );

  const engagementBoost = getEngagementPredictionScore(
    enriched,
    following
  );

  const creatorScore = enriched.ui.creatorScore || 0;
  const feedScore = enriched.ui.feedScore || 0;

  return (
    baseAffinity * 1.2 +
    interestBoost * 10 +
    engagementBoost * 0.5 +
    creatorScore * 0.3 +
    feedScore * 0.8
  );
}

/* =========================================================
   🎯 FOR YOU FEED (C20-A FINAL SYSTEM)
=========================================================*/

export function getForYouFeed(userId?: string) {
  const posts = getPosts();
  const following = getFollowing();

  const interestProfile = getUserInterestProfile(following);

  return posts
    .map((post) => {
      const enriched = enrichPost(post);

      const finalScore = getUnifiedFeedScore(
        enriched,
        following,
        interestProfile
      );

      return {
        ...enriched,
        ui: {
          ...enriched.ui,
          finalScore,
        },
      };
    })
    .sort((a, b) => b.ui.finalScore - a.ui.finalScore);
}

/* =========================================================
   👥 C19-A — CREATOR RECOMMENDATIONS (UNCHANGED)
=========================================================*/

function getUserNicheProfile(following: string[]) {
  const profile: Record<string, number> = {};

  creators
    .filter((c) => following.includes(c.name))
    .forEach((creator) => {
      profile[creator.niche] =
        (profile[creator.niche] || 0) + 1;
    });

  return profile;
}

function scoreCreatorRecommendation(
  creator: any,
  following: string[],
  nicheProfile: Record<string, number>
) {
  let score = 0;

  if (following.includes(creator.name)) {
    return -1;
  }

  score += (nicheProfile[creator.niche] || 0) * 10;
  score += parseInt(creator.followers) || 0;
  score += (parseFloat(creator.rating) || 0) * 20;

  return score;
}

export function getRecommendedCreators(userId?: string) {
  const following = getFollowing();
  const nicheProfile = getUserNicheProfile(following);

  return creators
    .map((creator) => ({
      ...creator,
      ui: {
        recommendationScore: scoreCreatorRecommendation(
          creator,
          following,
          nicheProfile
        ),
      },
    }))
    .filter((c) => c.ui.recommendationScore > 0)
    .sort(
      (a, b) =>
        b.ui.recommendationScore -
        a.ui.recommendationScore
    );
}