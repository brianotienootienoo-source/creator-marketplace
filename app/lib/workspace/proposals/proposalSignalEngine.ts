import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";
import { Creator } from "../entities/creator";
import { Campaign } from "../entities/campaign";

/**
 * 🧠 PROPOSAL SIGNAL ENGINE (A2 CORE)
 * Converts creator + campaign state into proposal intelligence signals
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

  const campaignAffinity = getCampaignAffinity(creator, campaign);
  const opportunityFit = getOpportunityFit(creator, campaign);
  const momentumBoost = getMomentumBoost(creatorSignal, context);

  const relevanceScore =
    creatorSignal.quality * 0.35 +
    creatorSignal.affinity * 0.35 +
    campaignAffinity * 0.2 +
    opportunityFit * 0.1;

  const conversionProbability =
    relevanceScore * 0.6 +
    creatorSignal.trend * 0.2 +
    momentumBoost * 0.2;

  const urgencyScore =
    creatorSignal.trend * 0.5 +
    momentumBoost * 0.3 +
    campaignAffinity * 0.2;

  const confidence =
    100 - Math.abs(creatorSignal.quality - campaignAffinity) * 0.5;

  const normalize = (v: number) =>
    Math.round(Math.max(0, Math.min(100, Number.isFinite(v) ? v : 0)));

  return {
    relevanceScore: normalize(relevanceScore),
    conversionProbability: normalize(conversionProbability),
    urgencyScore: normalize(urgencyScore),
    confidence: normalize(confidence),
    reasons: generateReasons(
      relevanceScore,
      conversionProbability,
      urgencyScore
    ),
  };
}

/* ---------------- HELPERS ---------------- */

function getCampaignAffinity(creator: Creator, campaign: Campaign): number {
  const niche = creator.niche?.toLowerCase?.() ?? "";
  const text =
    `${campaign.title ?? ""} ${campaign.description ?? ""}`.toLowerCase();

  if (!niche) return 40;
  if (text.includes(niche)) return 85;

  return 50;
}

function getOpportunityFit(creator: Creator, campaign: Campaign): number {
  const modes = creator.opportunityModes ?? [];

  if (modes.includes("brand_deals")) return 80;
  if (modes.includes("live_performance")) return 70;

  return 50;
}

function getMomentumBoost(
  signal: any,
  context: ProposalSignalContext
): number {
  if (context.surface === "dashboard") return 10;
  if (signal.trend > 70) return 20;
  return 5;
}

function generateReasons(r: number, c: number, u: number): string[] {
  const reasons: string[] = [];

  if (r > 70) reasons.push("High relevance match");
  if (c > 65) reasons.push("Strong conversion potential");
  if (u > 60) reasons.push("Time-sensitive opportunity");

  return reasons;
}