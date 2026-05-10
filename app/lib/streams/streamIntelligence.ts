import { FeedItem } from "@/app/lib/feedV2";
import { getMemoryPenalty } from "@/app/lib/streams/feedMemoryStore";
import { scoreCreator } from "@/app/lib/creators/creatorIntelligence";

/* -----------------------------
   STREAM INTELLIGENCE ENGINE
------------------------------*/

export type StreamType = "forYou" | "explore";

export function scoreStreamItem(item: FeedItem, stream: StreamType) {
  const baseScore = item.score ?? 0;

  const memoryPenalty = getMemoryPenalty(item.id ?? "");

  let creatorBoost = 0;
  let nicheBoost = 0;

  if (item.type === "creator") {
    creatorBoost = scoreCreator(item);
  }

  if (item.type === "creator") {
    nicheBoost =
      item.category === "entertainment"
        ? 0.12
        : item.category === "education"
        ? 0.1
        : item.category === "lifestyle"
        ? 0.08
        : 0.05;
  }

  let multiplier = 1;

  /* -----------------------------
     STREAM BIAS
  ------------------------------*/
  if (stream === "forYou") {
    multiplier += 0.25;
  }

  if (stream === "explore") {
    multiplier += 0.15;
  }

  /* -----------------------------
     FINAL SCORE
  ------------------------------*/
  return (
    baseScore * multiplier +
    creatorBoost +
    nicheBoost * 10 -
    memoryPenalty * 15
  );
}