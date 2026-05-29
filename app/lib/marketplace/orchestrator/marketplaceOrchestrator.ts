import { buildFeedV2 } from "@/app/lib/feedV2";
import { getFeed } from "@/app/lib/feedEngine";
import { getRouteFeedMode } from "@/app/lib/routeFeedBehavior";

export type FeedMode =
  | "DISCOVERY_HEAVY"
  | "ENGAGEMENT_HEAVY"
  | "TREND_HEAVY"
  | "PREMIUM_STABLE";

interface OrchestratorInput {
  pathname?: string;
  brandId?: string;
  forceMode?: FeedMode;
}

/**
 * 🧠 25A MARKETPLACE ORCHESTRATOR
 */
export function getMarketplaceFeed(input: OrchestratorInput) {
  const mode =
    input.forceMode ??
    getRouteFeedMode({ pathname: input.pathname });

  if (process.env.NODE_ENV === "development") {
    console.log("[25A ORCHESTRATOR]", {
      pathname: input.pathname,
      brandId: input.brandId,
      mode,
    });
  }

  /**
   * 1. PREMIUM_STABLE → feedEngine only
   */
  if (mode === "PREMIUM_STABLE") {
    return {
      mode,
      source: "feedEngine",
      data: getFeed(input.brandId),
    };
  }

  /**
   * 2. ENGAGEMENT_HEAVY → feedV2 filtered ONLY inside feedV2 (not here)
   */
  if (mode === "ENGAGEMENT_HEAVY") {
    return {
      mode,
      source: "feedV2:engagement",
      data: buildFeedV2({ mode: "ENGAGEMENT_HEAVY" }),
    };
  }

  /**
   * 3. TREND_HEAVY → feedV2 sorted ONLY inside feedV2 (not here)
   */
  if (mode === "TREND_HEAVY") {
    return {
      mode,
      source: "feedV2:trend",
      data: buildFeedV2({ mode: "TREND_HEAVY" }),
    };
  }

  /**
   * 4. DISCOVERY (default)
   */
  return {
    mode: "DISCOVERY_HEAVY",
    source: "feedV2:default",
    data: buildFeedV2({ mode: "DISCOVERY_HEAVY" }),
  };
}