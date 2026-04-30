import { getPosts } from "../posts";
import {
  enrichPost,
  getUserAffinityScore,
  getUserInterestProfile,
  getCreatorAffinityScore,
  getEngagementPredictionScore,
} from "./feedCore";

import { getFollowing } from "../following";

/* =========================================================
   🌍 GLOBAL FEED
=========================================================*/

export function getGlobalFeed() {
  const posts = getPosts();

  const enriched = posts.map(enrichPost);

  return enriched.sort(
    (a, b) => b.ui.feedScore - a.ui.feedScore
  );
}

/* =========================================================
   🔥 TRENDING FEED
=========================================================*/

export function getTrendingFeed() {
  const posts = getPosts();

  const enriched = posts
    .map(enrichPost)
    .filter((p) => p.ui.virality !== "cold");

  return enriched.sort(
    (a, b) => b.ui.engagement - a.ui.engagement
  );
}

/* =========================================================
   👥 FOLLOWING FEED
=========================================================*/

export function getFollowingFeed() {
  const posts = getPosts();
  const following = getFollowing();

  const enriched = posts
    .filter((p) => following.includes(p.creatorSlug))
    .map(enrichPost);

  return enriched.sort(
    (a, b) => b.ui.feedScore - a.ui.feedScore
  );
}

/* =========================================================
   🎯 FOR YOU FEED (C20-A + C18-B + C19-B SYSTEM)
=========================================================*/

export function getForYouFeed() {
  const posts = getPosts();
  const following = getFollowing();

  const interestProfile = getUserInterestProfile(following);

  const enriched = posts.map((post) => {
    const base = enrichPost(post);

    const affinity = getUserAffinityScore(base, following);

    const interest = getCreatorAffinityScore(
      base,
      interestProfile
    );

    const engagement = getEngagementPredictionScore(
      base,
      following
    );

    const finalScore =
      affinity + interest * 10 + engagement * 0.5;

    return {
      ...base,
      ui: {
        ...base.ui,
        finalScore,
      },
    };
  });

  return enriched.sort(
    (a, b) => b.ui.finalScore - a.ui.finalScore
  );
}