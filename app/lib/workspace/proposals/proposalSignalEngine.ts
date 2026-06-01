import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";
import { Creator } from "../entities/creator";
import { Campaign } from "../entities/campaign";

export type ProposalSignalContext = {
  surface: "dashboard" | "workspace" | "feed";
  timeOfDay?: number;
};

export type ProposalSignal = {
  relevanceScore: number;
  conversionProbability: number;
  urgencyScore: number;
  confidence: number;
  reasons: string[];
};

export function getProposalSignal(
  creator: Creator,
  campaign: Campaign,
  context: ProposalSignalContext
): ProposalSignal {
  const creatorSignal = getUnifiedSignal(creator, {
    surface: context.surface,
    timeOfDay: context.timeOfDay,
  });

  const categoryFit = getCategoryFit(creator, campaign);
  const engagementStrength = getEngagementStrength(creator);
  const audienceStrength = getAudienceStrength(creator);
  const brandTrust = getBrandTrust(creator);
  const urgencyScore = getDeadlineUrgency(campaign);

  const relevanceScore =
    categoryFit * 0.4 +
    engagementStrength * 0.2 +
    audienceStrength * 0.15 +
    brandTrust * 0.15 +
    creatorSignal.affinity * 0.1;

  const conversionProbability =
    relevanceScore * 0.5 +
    engagementStrength * 0.2 +
    brandTrust * 0.2 +
    creatorSignal.trend * 0.1;

  const confidence =
    categoryFit * 0.4 +
    brandTrust * 0.3 +
    engagementStrength * 0.3;

  return {
    relevanceScore: normalize(relevanceScore),
    conversionProbability: normalize(conversionProbability),
    urgencyScore: normalize(urgencyScore),
    confidence: normalize(confidence),
    reasons: generateReasons({
      categoryFit,
      engagementStrength,
      audienceStrength,
      brandTrust,
      urgencyScore,
    }),
  };
}

/* helpers unchanged */
function normalize(value: number): number {
  return Math.round(Math.max(0, Math.min(100, value || 0)));
}

/* rest unchanged (same as your version) */