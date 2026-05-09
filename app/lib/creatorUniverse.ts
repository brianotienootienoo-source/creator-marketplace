import { creators as seedCreators } from "@/app/data/creators";
import { getCreatorScore } from "@/app/lib/creatorIntelligence";
import { getMomentumScore } from "@/app/lib/momentum";
import { getTrendLabel } from "@/app/lib/trendLabel";

/* -----------------------------
   UNIFIED CREATOR DTO (SOURCE OF TRUTH)
------------------------------*/
export function getCreatorUniverse() {
  return seedCreators.map((c) => {
    const baseScore = getCreatorScore({
      id: c.id,
      name: c.name,
      category: c.category,
      followers: c.followers,
      engagementRate: c.engagementRate,
      pastBrandScore: c.pastBrandScore,
    });

    const momentum = getMomentumScore(c.id);

    const score = Math.round(baseScore + momentum);

    const trend = getTrendLabel(score, momentum ?? 0);

    return {
      // 🔑 CORE IDENTITY (MUST MATCH ACROSS ENTIRE APP)
      id: c.id,
      slug: c.slug,

      name: c.name,
      category: c.category,

      // 🔥 SINGLE SOURCE OF TRUTH FOR AVATAR
      avatar: c.avatar || `https://i.pravatar.cc/150?u=${c.id}`,

      followers: c.followers,
      engagementRate: c.engagementRate,
      pastBrandScore: c.pastBrandScore,

      // scoring
      score,
      momentum,

      // UI enrichment (USED BY BOTH PAGES)
      trend: trend.label,
      trendColor: trend.color,
    };
  });
}