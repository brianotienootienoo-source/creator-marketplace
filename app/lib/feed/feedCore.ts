import { Post } from "../posts";
import { getViralityState, getFeedScore } from "../posts";
import { calculateCreatorScore } from "../posts";
import { creators } from "@/app/data/creators";

/* =========================================================
   🧠 C20-B — FEED CORE (PURE LOGIC LAYER)
=========================================================*/

/**
 * Enrich post with computed intelligence
 * (NO sorting, NO feed composition here)
 */
export function enrichPost(post: Post) {
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
   🎯 C18-A — AFFINITY SCORE
=========================================================*/

export function getUserAffinityScore(
  post: any,
  following: string[]
) {
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

export function getUserInterestProfile(
  following: string[]
) {
  const profile: Record<string, number> = {};

  creators
    .filter((c) => following.includes(c.name))
    .forEach((creator) => {
      profile[creator.niche] =
        (profile[creator.niche] || 0) + 1;
    });

  return profile;
}

/**
 * Creator affinity boost based on niche match
 */
export function getCreatorAffinityScore(
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
   🟡 C19-B — ENGAGEMENT PREDICTION MODEL
=========================================================*/

export function getEngagementPredictionScore(
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