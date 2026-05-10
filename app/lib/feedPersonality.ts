import { FeedMode, FEED_MODE_CONFIG } from "./feedModes";

export interface FeedScoreInput {
  baseScore: number;
  momentumScore: number;
  discoveryScore: number;
  stabilityScore: number;
  randomnessScore: number;
  exposurePenalty: number;
  engagementScore: number;
}

export function applyFeedPersonality(
  mode: FeedMode,
  input: FeedScoreInput
) {
  const config = FEED_MODE_CONFIG[mode];

  const score =
    input.baseScore +
    input.momentumScore * config.momentumWeight +
    input.discoveryScore * config.discoveryWeight +
    input.stabilityScore * config.stabilityWeight +
    input.randomnessScore * config.randomnessWeight +
    input.engagementScore * config.engagementWeight -
    input.exposurePenalty * config.exposurePenaltyWeight;

  return Math.round(score * 100) / 100;
}