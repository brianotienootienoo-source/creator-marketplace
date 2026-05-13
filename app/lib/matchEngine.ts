import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { getEngagementBoost } from "./engagementMemory";

/**
 * CORE MATCH ENGINE (UNIFIED)
 */
export function getMatches(brandId?: string) {
  const creators = getCreatorUniverse();
  const brands = getBrandUniverse();

  const targetBrand = brands.find((b) => b.id === brandId);

  return creators
    .map((creator) => {
      let score = creator.score ?? 0;

      if (targetBrand) {
        const creatorCategory = creator.category?.toLowerCase();
        const brandNiche = targetBrand.category?.toLowerCase();

        if (
          creatorCategory &&
          brandNiche &&
          creatorCategory === brandNiche
        ) {
          score += 15;
        }

        const engagementBoost = getEngagementBoost(
          targetBrand.id,
          creator.id
        );

        score += engagementBoost;
      }

      return {
        id: creator.id,
        name: creator.name,
        category: creator.category,
        avatar: creator.avatar,
        followers: creator.stats?.followers ?? creator.followers ?? 0,
        score: Math.round(score),
        trend: creator.trend,
        trendColor: creator.trendColor,
        reason: "unified match engine",
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * BACKWARD COMPATIBILITY WRAPPER
 * (CRITICAL: supports old callers safely)
 */
export function buildMatches(brandId?: string) {
  return getMatches(brandId);
}