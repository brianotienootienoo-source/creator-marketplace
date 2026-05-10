export type FeedMode =
  | "TREND_HEAVY"
  | "PREMIUM_STABLE"
  | "DISCOVERY_HEAVY"
  | "ENGAGEMENT_HEAVY";

export interface FeedModeProfile {
  momentumWeight: number;
  discoveryWeight: number;
  stabilityWeight: number;
  randomnessWeight: number;
  exposurePenaltyWeight: number;
  engagementWeight: number;
}

export const FEED_MODE_CONFIG: Record<FeedMode, FeedModeProfile> = {
  TREND_HEAVY: {
    momentumWeight: 1.5,
    discoveryWeight: 0.9,
    stabilityWeight: 0.7,
    randomnessWeight: 1.2,
    exposurePenaltyWeight: 0.6,
    engagementWeight: 0.9,
  },

  PREMIUM_STABLE: {
    momentumWeight: 0.8,
    discoveryWeight: 0.4,
    stabilityWeight: 1.6,
    randomnessWeight: 0.3,
    exposurePenaltyWeight: 1.2,
    engagementWeight: 0.8,
  },

  DISCOVERY_HEAVY: {
    momentumWeight: 0.7,
    discoveryWeight: 1.8,
    stabilityWeight: 0.5,
    randomnessWeight: 1.4,
    exposurePenaltyWeight: 0.5,
    engagementWeight: 0.7,
  },

  ENGAGEMENT_HEAVY: {
    momentumWeight: 1,
    discoveryWeight: 0.6,
    stabilityWeight: 0.9,
    randomnessWeight: 0.5,
    exposurePenaltyWeight: 1,
    engagementWeight: 1.8,
  },
};