import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";
import { getCreatorScore } from "@/app/lib/creatorIntelligence";
import { getMomentumScore } from "@/app/lib/momentum";
import { getTrendLabel } from "@/app/lib/trendLabel";

import { creators as legacyCreators } from "@/app/data/creators";

/* -----------------------------
   SAFE ARRAY
------------------------------*/
function safeArray<T>(input: T[] | undefined | null): T[] {
  return Array.isArray(input) ? input : [];
}

/* -----------------------------
   UNIFIED CREATOR DTO
------------------------------*/
export function getCreatorUniverse() {
  const raw = safeArray(legacyCreators);

  const adaptedCreators = safeArray(adaptLegacyCreators(raw));

  if (process.env.NODE_ENV === "development") {
    console.log("🧬 LEGACY:", raw.length);
    console.log("🧬 ADAPTED:", adaptedCreators.length);
  }

  /**
   * 🚨 HARD RULE:
   * NEVER MIX RAW + ADAPTED
   * ADAPTER IS SOURCE OF TRUTH
   */
  const source = adaptedCreators;

  return source.map((c: any) => {
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