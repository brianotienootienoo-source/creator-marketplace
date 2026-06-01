import { campaigns } from "@/app/data/campaigns";

export type SimulatedSignal = {
  campaignId: string;
  title: string;
  brandId: string;

  relevanceScore: number;
  conversionProbability: number;
  confidence: number;
  urgencyScore: number;

  trend: "rising" | "stable" | "declining";
  source: "simulation";
};

export function getSimulatedProposalSignals(creatorId: string): SimulatedSignal[] {
  return campaigns.map((campaign, index) =>
    generateSignal(campaign.id, campaign.title, campaign.brandId, index, creatorId)
  );
}

function generateSignal(
  campaignId: string,
  title: string,
  brandId: string,
  index: number,
  creatorId: string
): SimulatedSignal {
  const seed = hash(`${creatorId}-${campaignId}`);
  const base = normalizeSeed(seed);

  const relevanceScore = clamp(40 + base * 60 + noise(index, seed, 10), 0, 100);
  const conversionProbability = clamp(relevanceScore * 0.75 + noise(index, seed, 5), 0, 100);
  const confidence = clamp(50 + base * 50, 0, 100);
  const urgencyScore = clamp(30 + (100 - relevanceScore) * 0.4 + noise(index, seed, 8), 0, 100);

  const trend =
    relevanceScore > 75 ? "rising"
    : relevanceScore > 50 ? "stable"
    : "declining";

  return {
    campaignId,
    title,
    brandId,
    relevanceScore: Math.round(relevanceScore),
    conversionProbability: Math.round(conversionProbability),
    confidence: Math.round(confidence),
    urgencyScore: Math.round(urgencyScore),
    trend,
    source: "simulation",
  };
}

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function normalizeSeed(seed: number): number {
  return (seed % 1000) / 1000;
}

function noise(index: number, seed: number, factor: number): number {
  return ((seed + index * 31) % 100) / factor;
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}