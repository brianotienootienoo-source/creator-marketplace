import { FeedMode } from "./feedModes";

interface RouteBehaviorInput {
  pathname?: string;
  isBrandView?: boolean;
  isCreatorView?: boolean;
}

export function getRouteFeedMode({
  pathname,
  isBrandView,
  isCreatorView,
}: RouteBehaviorInput): FeedMode {
  if (pathname?.includes("/brands")) {
    return "PREMIUM_STABLE";
  }

  if (pathname?.includes("/creator")) {
    return "ENGAGEMENT_HEAVY";
  }

  if (pathname?.includes("/campaigns")) {
    return "TREND_HEAVY";
  }

  if (isBrandView) {
    return "PREMIUM_STABLE";
  }

  if (isCreatorView) {
    return "ENGAGEMENT_HEAVY";
  }

  return "DISCOVERY_HEAVY";
}