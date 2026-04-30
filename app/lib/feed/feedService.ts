import {
  getGlobalFeed,
  getTrendingFeed,
  getFollowingFeed,
  getForYouFeed,
} from "./feedSelectors";

import { getRecommendedCreators } from "./feedEngine";

/* =========================================================
   🚀 C20-D — FEED SERVICE LAYER (PUBLIC API)
=========================================================*/

/**
 * 🌍 Global feed (all posts ranked)
 */
export function fetchGlobalFeed() {
  return getGlobalFeed();
}

/**
 * 🔥 Trending feed (high engagement + virality)
 */
export function fetchTrendingFeed() {
  return getTrendingFeed();
}

/**
 * 👥 Following feed (only followed creators)
 */
export function fetchFollowingFeed() {
  return getFollowingFeed();
}

/**
 * 🎯 Personalized feed (For You)
 */
export function fetchForYouFeed() {
  return getForYouFeed();
}

/* =========================================================
   👤 CREATOR RECOMMENDATIONS
=========================================================*/

/**
 * 🧠 Suggested creators based on user behavior
 */
export function fetchRecommendedCreators() {
  return getRecommendedCreators();
}