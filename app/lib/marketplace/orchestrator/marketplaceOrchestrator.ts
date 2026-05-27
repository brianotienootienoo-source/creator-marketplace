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
 *
 * This is the ONLY decision layer above feeds.
 * It does NOT compute ranking.
 * It ONLY chooses which system is authoritative.
 */
export function getMarketplaceFeed(input: OrchestratorInput) {
  const mode =
    input.forceMode ??
    getRouteFeedMode({
      pathname: input.pathname,
    });

  /**
   * 🔍 DEBUG TRACE (25A VISIBILITY LAYER)
   * Helps confirm routing + engine selection before 25A-B streams
   */
  console.log("[25A ORCHESTRATOR]", {
    pathname: input.pathname,
    brandId: input.brandId,
    mode,
  });

  /**
   * --------------------------------------
   * 1. PREMIUM / BRAND SAFE MODE
   * --------------------------------------
   */
  if (mode === "PREMIUM_STABLE") {
    const feed = getFeed(input.brandId);

    return {
      mode,
      source: "feedEngine",
      data: feed,
    };
  }

  /**
   * --------------------------------------
   * 2. ENGAGEMENT HEAVY MODE
   * --------------------------------------
   */
  if (mode === "ENGAGEMENT_HEAVY") {
    const feed = buildFeedV2();

    const filtered = feed.filter((item) => {
      if (item.type === "creator") {
        return (item.score ?? 0) > 20;
      }
      return true;
    });

    return {
      mode,
      source: "feedV2:engagementFiltered",
      data: filtered,
    };
  }

  /**
   * --------------------------------------
   * 3. TREND HEAVY MODE
   * --------------------------------------
   */
  if (mode === "TREND_HEAVY") {
    const feed = buildFeedV2();

    const sorted = feed.sort((a, b) => {
      const trendBoostA =
        a.type === "creator" ? (a.trend === "up" ? 10 : 0) : 0;
      const trendBoostB =
        b.type === "creator" ? (b.trend === "up" ? 10 : 0) : 0;

      return (b.score + trendBoostB) - (a.score + trendBoostA);
    });

    return {
      mode,
      source: "feedV2:trendSorted",
      data: sorted,
    };
  }

  /**
   * --------------------------------------
   * 4. DISCOVERY MODE (DEFAULT)
   * --------------------------------------
   */
  return {
    mode,
    source: "feedV2:default",
    data: buildFeedV2(),
  };
}