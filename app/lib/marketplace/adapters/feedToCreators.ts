import { Creator } from "../entities";

/**
 * Converts 6.x feed items → Creator entities
 * PURE TRANSFORMER ONLY (no logic, no scoring)
 */

export function feedToCreators(feedItems: any[]): Creator[] {
  return feedItems
    .filter((item) => item.type === "creator")
    .map((item) => {
      const c = item.data;

      return {
        id: c.id,
        slug: c.slug || c.username,
        displayName: c.displayName || c.name,
        username: c.username || "",
        bio: c.bio || "",
        niche: c.niche || "General",
        tags: c.tags || [],
        platforms: c.platforms || [],
        verified: c.verified || false,
        avatar: c.avatar || "",
        bannerImage: c.bannerImage,
        stats: c.stats || {
          followers: 0,
          engagementRate: 0,
          averageViews: 0,
          averageLikes: 0,
        },
        audience: c.audience || {
          primaryAgeRange: "18-34",
          topLocations: [],
          interests: [],
        },
        portfolio: c.portfolio || [],
        matchScore: c.matchScore,
        trendScore: c.trendScore,
        createdAt: c.createdAt || new Date().toISOString(),
      };
    });
}