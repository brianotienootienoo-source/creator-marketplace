import {
  calculateCreatorScore,
  getCreatorPrice,
  getCreatorTrend,
} from "./posts";

import { creators } from "@/app/data/creators";

/**
 * 📊 Market snapshot per creator
 */
export function getMarketSnapshot() {
  return creators.map((c) => {
    const score = calculateCreatorScore(c.slug);
    const price = getCreatorPrice(c.slug);
    const trend = getCreatorTrend(c.slug);

    return {
      slug: c.slug,
      name: c.name,
      avatar: c.avatar,
      score,
      price,
      trend,

      // 📈 simple momentum indicator
      momentum:
        trend === "rising"
          ? score * 1.2
          : trend === "declining"
          ? score * 0.8
          : score,
    };
  });
}

/**
 * 🏆 ranked market view (like stock leaderboard)
 */
export function getMarketLeaderboard() {
  return getMarketSnapshot().sort(
    (a, b) => b.momentum - a.momentum
  );
}