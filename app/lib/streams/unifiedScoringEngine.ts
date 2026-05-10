import { FeedItem } from "@/app/lib/feedV2";
import { scoreStreamItem } from "./streamIntelligence";
import { scoreCreator } from "@/app/lib/creators/creatorIntelligence";
import { getMemoryPenalty } from "./feedMemoryStore";
import { getMatchQuality } from "@/app/lib/matches/matchFeedbackStore";
import { getStreamWeights } from "./streamWeightsEngine";
import { StreamWeights } from "./streamWeightsEngine";

/* -----------------------------
   SAFE DEFAULT CONTEXT
------------------------------*/
type Context = {
  stream: "forYou" | "explore";
  weights?: StreamWeights;
};

/* -----------------------------
   UNIFIED SCORING ENGINE
------------------------------*/
export function getUnifiedScore(
  item: FeedItem,
  context: Context
): number {
  const weights = context.weights ?? {
    ENGAGEMENT: 1,
    STABILITY: 0.8,
    DISCOVERY: 1,
    TREND: 0.7,
  };

  const baseScore = item.score ?? 0;

  const memoryPenalty = getMemoryPenalty(item.id ?? "");

  const creatorScore =
    item.type === "creator" ? scoreCreator(item) : 0;

  const matchBoost =
    item.type === "match"
      ? getMatchQuality(item.id ?? "")
      : 0;

  const streamScore = scoreStreamItem(item, context.stream);

  const weightFactor =
    context.stream === "forYou"
      ? (weights.ENGAGEMENT + weights.STABILITY)
      : (weights.DISCOVERY + weights.TREND);

  return (
    streamScore * (1 + weightFactor) +
    creatorScore +
    matchBoost * 2 +
    baseScore -
    memoryPenalty * 15
  );
}