import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getEngagementBoost } from "./engagementMemory";

/**
 * CORE MATCH ENGINE (BRAND CONTRACT LOCKED)
 */
export function getMatches(brandId?: string) {
  const creators = getCreatorUniverse();
  const brands = getBrandUniverse();

  const normalizedBrandId =
    brandId?.toLowerCase?.()?.trim() ?? "";

  const targetBrand = brands.find(
    (b) => b.id?.toLowerCase?.() === normalizedBrandId
  );

  return creators
    .map((creator) => {
      // 🔒 SINGLE SOURCE OF SCORING (FROM UNIVERSE ONLY)
      let score = creator.matchScore ?? 0;

      if (targetBrand) {
        // lightweight contextual boost only (NOT intelligence logic)

        try {
          score += getEngagementBoost(
            targetBrand.id,
            creator.id
          ) ?? 0;
        } catch {
          // engine must never fail
        }
      }

      return {
        id: creator.id,
        name: creator.name,
        category: creator.category,
        avatar: creator.avatar,
        followers: creator.followers,
        score: Math.round(score),

        // optional signals (already computed upstream)
        trend: creator.trend,
        trendColor: creator.trendColor,

        reason: "universe-driven-match",
      };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * BACKWARD COMPATIBILITY WRAPPER
 */
export function buildMatches(brandId?: string) {
  return getMatches(brandId);
}