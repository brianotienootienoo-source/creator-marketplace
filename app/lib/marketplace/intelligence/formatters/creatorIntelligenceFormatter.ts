import { getBrandCreatorView } from "@/app/lib/marketplace/views/brandCreatorView";
import { getCreatorReadiness } from "@/app/lib/marketplace/intelligence/creatorReadiness";
import { getCampaignMatches } from "@/app/lib/marketplace/intelligence/campaignMatchEngine";
import { Creator } from "@/app/lib/marketplace/entities/creator";

/**
 * 🧠 SINGLE SOURCE INTELLIGENCE FORMATTER (21B CORE)
 *
 * This is the ONLY place where creator intelligence is interpreted
 * for UI consumption across:
 * - Creator Profile
 * - Brand Dashboard
 * - Feed (future)
 */

export function getCreatorIntelligence(creator: Creator) {
  const brandView = getBrandCreatorView(creator.id);
  const readiness = getCreatorReadiness(creator);
  const campaigns = getCampaignMatches(creator);

  return {
    identity: {
      id: creator.id,
      name: creator.name,
      username: creator.username,
    },

    intelligence: {
      reason:
        brandView?.reason ||
        "Based on creator universe signals and engagement patterns",

      matchScore: brandView?.profile?.matchScore ?? 0,
      trendScore: brandView?.profile?.trendScore ?? 0,
      ratingScore: brandView?.profile?.ratingScore ?? 0,
    },

    readiness: {
      tier: readiness.tier,
      score: readiness.score,
      bestFit: readiness.bestFit,
    },

    campaigns: campaigns.slice(0, 3),

    meta: {
      hasHighMatch: (brandView?.profile?.matchScore ?? 0) > 65,
      hasMediumMatch: (brandView?.profile?.matchScore ?? 0) > 35,
    },
  };
}