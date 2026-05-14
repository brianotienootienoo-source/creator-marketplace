import { Creator } from "../../entities/creator";
import { formatIntelligence } from "./formatIntelligence";
import { getBrandIntelligenceSync } from "./sync/brandIntelligenceSync";

/**
 * 🧠 24D — UNIFIED INTELLIGENCE SYNC LAYER (FINAL CONTRACT)
 *
 * ⚠️ ENFORCEMENT RULE:
 *
 * This is the ONLY allowed entry point for intelligence in UI.
 *
 * DO NOT IMPORT:
 * - brandIntelligenceSync
 * - creatorIntelligenceFormatter
 * - getCreatorIntelligence
 *
 * All of them are INTERNAL ENGINE layers only.
 *
 * ARCHITECTURE:
 * - brandIntelligenceSync = source of truth (logic)
 * - formatIntelligence = UI formatting only
 * - this file = lightweight adapter ONLY
 */

export function getUnifiedIntelligenceSync(creator: Creator) {
  const intel = getBrandIntelligenceSync(creator);

  /**
   * RAW SIGNALS (NO TRANSFORMATION)
   */
  const signals = intel.signals;

  /**
   * UI FORMATTING ONLY (safe layer)
   */
  const formatted = formatIntelligence({
    matchScore: signals.matchScore,
    trendScore: signals.trendScore,
    ratingScore: signals.ratingScore,
  });

  return {
    creatorId: creator.id,

    signals,

    formatted,

    /**
     * READINESS = PASS THROUGH (NO RE-MAPPING)
     */
    readiness: intel.interpretation,

    /**
     * CAMPAIGNS = PASS THROUGH
     */
    campaigns: intel.actions.topCampaigns ?? [],

    /**
     * META = SINGLE SOURCE (NO OVERRIDE LOGIC)
     */
    meta: {
      label: intel.meta.label,
      tone: formatted.tone,
      reason: "Based on unified brand intelligence sync",
    },

    /**
     * BACKWARD COMPATIBILITY ONLY (TEMPORARY)
     */
    legacy: {
      matchScore: formatted.matchScore,
      trendScore: formatted.trendScore,
      ratingScore: formatted.ratingScore,
      label: formatted.label,
      tone: formatted.tone,
    },
  };
}