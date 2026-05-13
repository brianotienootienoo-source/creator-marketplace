import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";
import { getCreatorScore } from "@/app/lib/creatorIntelligence";
import { getMomentumScore } from "@/app/lib/momentum";
import { getTrendLabel } from "@/app/lib/trendLabel";

// 🔥 SINGLE LEGACY ENTRY POINT ONLY (DO NOT USE ELSEWHERE)
import { creators as legacyCreators } from "@/app/data/creators";

/* -----------------------------
   UNIFIED CREATOR DTO (SOURCE OF TRUTH)
------------------------------*/
export function getCreatorUniverse() {
  const adaptedCreators = adaptLegacyCreators(legacyCreators);

  return adaptedCreators.map((c) => {
    const baseScore = getCreatorScore({
      id: c.id,
      name: c.displayName,
      category: c.niche,
      followers: c.stats?.followers ?? 0,
      engagementRate: c.stats?.engagementRate ?? 0,
      pastBrandScore: c.ratingScore,
    });

    const momentum = getMomentumScore(c.id) ?? 0;

    const score = Math.round(baseScore + momentum);

    const trend = getTrendLabel(score, momentum);

    return {
      id: c.id,
      slug: c.slug,

      name: c.displayName,
      category: c.niche,

      avatar: c.avatar || `https://i.pravatar.cc/150?u=${c.id}`,

      followers: c.stats?.followers ?? 0,
      engagementRate: c.stats?.engagementRate ?? 0,
      pastBrandScore: c.ratingScore ?? 0,

      score,
      momentum,

      trend: trend.label,
      trendColor: trend.color,
    };
  });
}