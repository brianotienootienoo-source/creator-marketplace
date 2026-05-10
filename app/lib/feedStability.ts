type FeedItem = {
  id: string;
  type: "creator" | "brand" | "match";
  score: number;
};

const recentOrderCache: Record<string, number> = {};

/* -----------------------------
   STABILITY BOOST
------------------------------*/
export function applyFeedStabilityBoost(
  items: FeedItem[],
  seed: number
) {
  return items.map((item, index) => {
    const previousPosition =
      recentOrderCache[item.id] ?? index;

    const positionDrift = Math.abs(
      previousPosition - index
    );

    const stabilityPenalty = positionDrift * 0.3;

    // small deterministic smoothing
    const noise = seededNoise(seed, item.id);

    const adjustedScore =
      item.score - stabilityPenalty + noise;

    recentOrderCache[item.id] = index;

    return {
      ...item,
      score: adjustedScore,
    };
  });
}

/* -----------------------------
   DETERMINISTIC NOISE
------------------------------*/
function seededNoise(seed: number, id: string) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }

  return ((seed + hash) % 7) * 0.1;
}