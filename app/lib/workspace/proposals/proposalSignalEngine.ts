import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";
import { Creator } from "../entities/creator";
import { Campaign } from "../entities/campaign";

/**
 * 🧠 PROPOSAL SIGNAL ENGINE (A2 CORE)
 * Converts creator + campaign state into proposal intelligence signals.
 *
 * RULES:
 * - Computation only
 * - No UI logic
 * - No aggregation logic
 * - No feed logic
 */

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

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function normalize(value: number): number {
  return Math.round(
    Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0))
  );
}

function getCategoryFit(
  creator: Creator,
  campaign: Campaign
): number {
  const category =
    String((creator as any).category ?? "").toLowerCase();

  const campaignText =
    `${campaign.title ?? ""} ${campaign.niche ?? ""}`.toLowerCase();

  if (!category) return 50;

  if (
    category.includes("music") &&
    campaignText.includes("music")
  ) {
    return 95;
  }

  if (
    category.includes("fitness") &&
    campaignText.includes("fitness")
  ) {
    return 95;
  }

  if (
    category.includes("film") &&
    campaignText.includes("film")
  ) {
    return 95;
  }

  if (
    category.includes("tv") &&
    campaignText.includes("tv")
  ) {
    return 90;
  }

  if (
    category.includes("influencer") &&
    campaignText.includes("lifestyle")
  ) {
    return 80;
  }

  return 55;
}

function getEngagementStrength(creator: Creator): number {
  const engagement =
    Number((creator as any).engagementRate ?? 0);

  return normalize(engagement * 1000);
}

function getAudienceStrength(creator: Creator): number {
  const followers =
    Number((creator as any).followers ?? 0);

  if (followers >= 1000000) return 100;
  if (followers >= 500000) return 90;
  if (followers >= 250000) return 80;
  if (followers >= 100000) return 70;
  if (followers >= 50000) return 60;
  if (followers >= 10000) return 50;

  return 40;
}

function getBrandTrust(creator: Creator): number {
  return normalize(
    Number((creator as any).pastBrandScore ?? 50)
  );
}

function getDeadlineUrgency(campaign: Campaign): number {
  const deadline = String(
    (campaign as any).deadline ?? ""
  );

  const match = deadline.match(/(\d+)/);

  if (!match) return 50;

  const days = Number(match[1]);

  if (days <= 2) return 100;
  if (days <= 5) return 85;
  if (days <= 7) return 70;
  if (days <= 14) return 55;

  return 40;
}

function generateReasons(input: {
  categoryFit: number;
  engagementStrength: number;
  audienceStrength: number;
  brandTrust: number;
  urgencyScore: number;
}): string[] {
  const reasons: string[] = [];

  if (input.categoryFit >= 80) {
    reasons.push("Strong category alignment");
  }

  if (input.engagementStrength >= 60) {
    reasons.push("High audience engagement");
  }

  if (input.audienceStrength >= 80) {
    reasons.push("Large audience reach");
  }

  if (input.brandTrust >= 70) {
    reasons.push("Strong brand collaboration history");
  }

  if (input.urgencyScore >= 80) {
    reasons.push("Application window closing soon");
  }

  if (reasons.length === 0) {
    reasons.push("General marketplace opportunity");
  }

  return reasons;
}