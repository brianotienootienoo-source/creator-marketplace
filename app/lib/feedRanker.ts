import { buildMatches } from "./matchEngine";

type RankedItem = {
  creator: any;
  brand: any;
  score: number;
  boostScore: number;
  finalScore: number;
};

/* =========================
   FEED RANKING ENGINE
   (Phase 4 core logic)
========================= */

export function rankFeed(brandId?: string) {
  const matches = buildMatches(brandId);

  return matches
    .map((m) => {
      // Base score from match engine
      const base = m.score;

      // 🔥 engagement boost (future hook)
      const engagementBoost =
        (m.creator?.engagementRate ?? 0) * 20;

      // 🔥 popularity smoothing
      const followerBoost =
        Math.min((m.creator?.followers ?? 0) / 5000, 10);

      const finalScore = base + engagementBoost + followerBoost;

      return {
        creator: m.creator,
        brand: m.brand,
        score: base,
        boostScore: engagementBoost + followerBoost,
        finalScore,
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}