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
      let score = creator?.score ?? creator?.stats?.followers ?? 0;

      if (targetBrand) {
        const creatorCategory =
          creator.category?.toLowerCase?.();

        const brandCategory =
          targetBrand.category?.toLowerCase?.();

        if (
          creatorCategory &&
          brandCategory &&
          creatorCategory === brandCategory
        ) {
          score += 15;
        }

        // 🔒 safe engagement boost (no crash if undefined)
        try {
          score += getEngagementBoost(
            targetBrand.id,
            creator.id
          ) ?? 0;
        } catch {
          // fail silently (engine must NEVER crash feed)
        }
      }

      return {
        id: creator.id,
        name: creator.name,
        category: creator.category,
        avatar: creator.avatar,
        followers: creator.followers,
        score: Math.round(score),
        trend: creator.trend,
        trendColor: creator.trendColor,
        reason: "brand-contract-lock",
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