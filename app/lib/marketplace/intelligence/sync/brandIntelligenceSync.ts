import { Creator } from "@/app/lib/marketplace/entities/creator";
import { getCreatorIntelligence } from "../formatters/creatorIntelligenceFormatter";

/**
 * 🧠 BRAND INTELLIGENCE SYNC LAYER (22C CORE)
 *
 * This is the FINAL normalization layer for ALL brand-facing intelligence.
 * Everything brand UI uses must pass through here.
 */

export function getBrandIntelligenceSync(creator: Creator) {
  const intel = getCreatorIntelligence(creator);

  return {
    creatorId: creator.id,

    // =========================
    // CORE SIGNALS (UNIFIED MEANING)
    // =========================
    signals: {
      matchScore: intel.intelligence.matchScore,
      trendScore: intel.intelligence.trendScore,
      ratingScore: intel.intelligence.ratingScore,
    },

    // =========================
    // BUSINESS INTERPRETATION LAYER
    // =========================
    interpretation: {
      tier:
        intel.intelligence.matchScore > 65
          ? "HIGH"
          : intel.intelligence.matchScore > 35
          ? "MEDIUM"
          : "LOW",

      readinessTier: intel.readiness.tier,
      readinessScore: intel.readiness.score,
      bestFit: intel.readiness.bestFit,
    },

    // =========================
    // ACTIONABLE OUTPUT (BRANDS USE THIS)
    // =========================
    actions: {
      recommended: intel.campaigns.length > 0,
      topCampaigns: intel.campaigns,
    },

    // =========================
    // META CONTEXT
    // =========================
    meta: {
      label:
        intel.meta.hasHighMatch
          ? "Strong Match"
          : intel.meta.hasMediumMatch
          ? "Potential Match"
          : "Low Signal",
    },
  };
}