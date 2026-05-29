export type FeedMode =
  | "DISCOVERY_HEAVY"
  | "ENGAGEMENT_HEAVY"
  | "TREND_HEAVY"
  | "PREMIUM_STABLE";

export function getFeedVisualStyle(mode: FeedMode) {
  switch (mode) {
    case "PREMIUM_STABLE":
      return {
        density: "comfortable",
        gap: 14,
        cardScale: 1,
        tone: "neutral",
      };

    case "DISCOVERY_HEAVY":
      return {
        density: "airy",
        gap: 18,
        cardScale: 1,
        tone: "explore",
      };

    case "ENGAGEMENT_HEAVY":
      return {
        density: "compact",
        gap: 10,
        cardScale: 0.98,
        tone: "active",
      };

    case "TREND_HEAVY":
      return {
        density: "dynamic",
        gap: 12,
        cardScale: 1.03,
        tone: "rising",
      };

    default:
      return {
        density: "comfortable",
        gap: 14,
        cardScale: 1,
        tone: "neutral",
      };
  }
}