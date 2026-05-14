import { Creator } from "@/app/lib/marketplace/entities/creator";
import { getUnifiedIntelligenceSync } from "./unifiedIntelligenceSync";

/**
 * 🧠 24E — CREATOR DECISION ENGINE
 *
 * PURPOSE:
 * Central recommendation + ranking authority.
 *
 * FUTURE RESPONSIBILITIES:
 * - creator ranking
 * - feed ordering
 * - campaign prioritization
 * - invite recommendations
 * - marketplace matching
 *
 * IMPORTANT:
 * This engine DOES NOT create intelligence.
 * It only interprets already-normalized intelligence.
 */

export function getCreatorDecisionEngine(creator: Creator) {
  const intelligence = getUnifiedIntelligenceSync(creator);

  /**
   * CORE SIGNALS
   */
  const matchScore = intelligence.signals.matchScore ?? 0;
  const trendScore = intelligence.signals.trendScore ?? 0;
  const ratingScore = intelligence.signals.ratingScore ?? 0;

  /**
   * COMPOSITE DECISION SCORE
   *
   * This becomes the future:
   * - ranking score
   * - recommendation score
   * - feed weight
   */
  const decisionScore =
    matchScore * 0.55 +
    trendScore * 0.25 +
    ratingScore * 0.20;

  /**
   * NORMALIZED PRIORITY
   */
  let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW";

  if (decisionScore >= 70) {
    priority = "HIGH";
  } else if (decisionScore >= 40) {
    priority = "MEDIUM";
  }

  /**
   * RECOMMENDATION STATUS
   */
  const recommended =
    priority === "HIGH" ||
    intelligence.campaigns.length > 0;

  /**
   * FINAL OUTPUT
   */
  return {
    creatorId: creator.id,

    priority,

    recommended,

    decisionScore: Math.round(decisionScore),

    signals: intelligence.signals,

    formatted: intelligence.formatted,

    readiness: intelligence.readiness,

    campaigns: intelligence.campaigns,

    meta: {
      label: intelligence.meta.label,
      reason: intelligence.meta.reason,
    },
  };
}