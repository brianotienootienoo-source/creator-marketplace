import { getBrandMetrics } from "@/app/lib/brandMetrics";
import { buildMatches } from "@/app/lib/matchEngine";

type BrandInsight = {
  label: string;
  score: number;
  tone: "positive" | "neutral" | "warning";
};

export function getBrandIntelligence(brandId: string) {
  const metrics = getBrandMetrics(brandId);
  const matches = buildMatches();

  // filter only this brand's matches
  const brandMatches = matches.filter((m) => m.brand.id === brandId);

  const creatorCompetition = brandMatches.length;

  // -----------------------------
  // 1. DEMAND INTELLIGENCE
  // -----------------------------
  let demandLabel: BrandInsight;

  if (metrics.demandScore > 120) {
    demandLabel = {
      label: "🔥 High demand brand",
      score: metrics.demandScore,
      tone: "positive",
    };
  } else if (metrics.demandScore > 70) {
    demandLabel = {
      label: "⚖️ Moderate demand brand",
      score: metrics.demandScore,
      tone: "neutral",
    };
  } else {
    demandLabel = {
      label: "🟡 Emerging brand",
      score: metrics.demandScore,
      tone: "warning",
    };
  }

  // -----------------------------
  // 2. CREATOR COMPETITION
  // -----------------------------
  let competitionLabel: BrandInsight;

  if (creatorCompetition > 20) {
    competitionLabel = {
      label: "⚔️ High creator competition",
      score: creatorCompetition,
      tone: "warning",
    };
  } else if (creatorCompetition > 8) {
    competitionLabel = {
      label: "⚖️ Moderate competition",
      score: creatorCompetition,
      tone: "neutral",
    };
  } else {
    competitionLabel = {
      label: "🟢 Low competition (opportunity)",
      score: creatorCompetition,
      tone: "positive",
    };
  }

  // -----------------------------
  // 3. CAMPAIGN VELOCITY
  // -----------------------------
  let velocityLabel: BrandInsight;

  if (metrics.activeCampaigns >= 3) {
    velocityLabel = {
      label: "🚀 High campaign velocity",
      score: metrics.activeCampaigns,
      tone: "positive",
    };
  } else if (metrics.activeCampaigns === 2) {
    velocityLabel = {
      label: "📊 Steady campaign activity",
      score: metrics.activeCampaigns,
      tone: "neutral",
    };
  } else {
    velocityLabel = {
      label: "🧊 Low campaign activity",
      score: metrics.activeCampaigns,
      tone: "warning",
    };
  }

  return {
    demandLabel,
    competitionLabel,
    velocityLabel,
  };
}