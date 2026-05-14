import { Creator } from "../entities/creator";

/**
 * 🧭 PROFILE VIEW CONTRACT
 * Defines how creator data is safely reused across:
 * - marketplace profile pages
 * - future dashboards
 * - brand inspection views
 */

export function buildProfileView(creator: Creator) {
  return {
    id: creator.id,

    displayName: creator.displayName,
    username: creator.username,

    avatar: creator.avatar,
    banner: creator.bannerImage,

    niche: creator.niche,

    stats: {
      followers: creator.stats?.followers ?? 0,
      engagement: creator.stats?.engagementRate ?? 0,
    },

    trust: {
      verified: creator.verified,
      rating: creator.ratingScore ?? 0,
    },

    meta: {
      types: creator.creatorTypes,
      modes: creator.opportunityModes,
    },
  };
}