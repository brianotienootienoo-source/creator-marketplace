import { buildMatches } from "./matches/matchEngine";
import { getUnifiedSignal } from "./core/unifiedSignalEngine";

type RankedItem = {
  creator: any;
  brand: any;
  score: number;
  finalScore: number;
};

/**
 * FEED RANKING = PURE CONSUMER OF UNIFIED INTELLIGENCE BRAIN
 * NO LOCAL SCORING LOGIC ALLOWED
 */
export function rankFeed(brandId?: string) {
  const matches = buildMatches(brandId);

  return matches
    .map((m) => {
      const signal = getUnifiedSignal(m.creator, {
        surface: "feed",
      });

      const engagementBoost =
        (m.creator?.engagementRate ?? 0) * 10;

      const followerBoost =
        Math.min((m.creator?.followers ?? 0) / 5000, 10);

      const finalScore =
        signal.score +
        engagementBoost +
        followerBoost;

      return {
        creator: m.creator,
        brand: m.brand,
        score: signal.score,
        finalScore,
      };
    })
    .sort((a, b) => b.finalScore - a.finalScore);
}