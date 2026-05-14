import { Creator } from "../../entities/creator";
import { formatIntelligence } from "./formatIntelligence";
import { getBrandIntelligenceSync } from "./sync/brandIntelligenceSync";

/**
 * 🧠 22C — UNIFIED INTELLIGENCE SYNC LAYER
 *
 * This version removes fragile formatter dependency
 * and anchors system to brandIntelligenceSync (stable source).
 */

export function getUnifiedIntelligenceSync(creator: Creator) {
  const intel = getBrandIntelligenceSync(creator);

  /**
   * RAW SIGNALS
   */
  const rawSignals = {
    matchScore: intel.signals.matchScore,
    trendScore: intel.signals.trendScore,
    ratingScore: intel.signals.ratingScore,
  };

  /**
   * FORMATTED UI INTELLIGENCE
   */
  const formatted = formatIntelligence(rawSignals);

  return {
    creatorId: creator.id,

    signals: rawSignals,

    formatted,

    readiness: intel.interpretation,

    campaigns: intel.actions.topCampaigns ?? [],

    meta: {
      label: intel.meta.label,
      tone: formatted.tone,
      reason: "Based on unified brand intelligence sync",
    },

    legacy: {
      matchScore: formatted.matchScore,
      trendScore: formatted.trendScore,
      ratingScore: formatted.ratingScore,
      label: formatted.label,
      tone: formatted.tone,
    },
  };
}