import { getProposalSignal } from "./proposalSignalEngine";
import { campaigns } from "@/app/data/campaigns";
import { creators } from "@/app/data/creators";

/**
 * 🔗 PROPOSAL INTELLIGENCE BRIDGE (A2 CORE)
 *
 * Responsibilities:
 * - Aggregate proposal signals
 * - Produce dashboard-safe intelligence outputs
 * - No UI rendering
 * - No feed transformation
 */

export function getProposalIntelligence(creatorId: string) {
  const creator = creators.find((c) => c.id === creatorId);

  if (!creator) {
    return emptyResponse();
  }

  const signals = campaigns.map((campaign) => {
    const signal = getProposalSignal(creator as any, campaign as any, {
      surface: "dashboard",
    });

    return {
      campaignId: campaign.id,
      title: campaign.title,
      brandId: campaign.brandId,
      signal,
    };
  });

  const sorted = [...signals].sort(
    (a, b) => b.signal.relevanceScore - a.signal.relevanceScore
  );

  const topSignals = sorted.slice(0, 5);

  return {
    summary: buildSummary(sorted),
    topSignals,
    recentActivity: generateRecentActivity(topSignals),
    recommendations: generateRecommendations(topSignals),
    proposalHealth: buildProposalHealth(topSignals),
  };
}

/* -------------------------------------------------------------------------- */
/* SUMMARY                                                                     */
/* -------------------------------------------------------------------------- */

function buildSummary(signals: any[]) {
  const strongMatches = signals.filter(
    (s) => s.signal.relevanceScore >= 75
  ).length;

  const warmMatches = signals.filter(
    (s) =>
      s.signal.relevanceScore >= 55 &&
      s.signal.relevanceScore < 75
  ).length;

  return {
    totalOpportunities: signals.length,
    strongMatches,
    warmMatches,
    averageRelevance:
      signals.length > 0
        ? Math.round(
            signals.reduce(
              (sum, item) => sum + item.signal.relevanceScore,
              0
            ) / signals.length
          )
        : 0,
  };
}

/* -------------------------------------------------------------------------- */
/* ACTIVITY                                                                    */
/* -------------------------------------------------------------------------- */

function generateRecentActivity(signals: any[]) {
  return signals.map((item) => ({
    id: item.campaignId,
    title: item.title,
    status:
      item.signal.conversionProbability >= 75
        ? "high-potential"
        : "warm-opportunity",
    relevanceScore: item.signal.relevanceScore,
  }));
}

/* -------------------------------------------------------------------------- */
/* RECOMMENDATIONS                                                             */
/* -------------------------------------------------------------------------- */

function generateRecommendations(signals: any[]) {
  return signals.slice(0, 3).map((item) => ({
    campaignId: item.campaignId,
    title: item.title,
    relevanceScore: item.signal.relevanceScore,
    conversionProbability:
      item.signal.conversionProbability,
  }));
}

/* -------------------------------------------------------------------------- */
/* HEALTH                                                                      */
/* -------------------------------------------------------------------------- */

function buildProposalHealth(signals: any[]) {
  if (signals.length === 0) {
    return {
      score: 0,
      label: "No Opportunities",
    };
  }

  const average =
    signals.reduce(
      (sum, item) => sum + item.signal.relevanceScore,
      0
    ) / signals.length;

  const score = Math.round(average);

  let label = "Developing";

  if (score >= 80) {
    label = "Excellent";
  } else if (score >= 65) {
    label = "Strong";
  } else if (score >= 50) {
    label = "Healthy";
  }

  return {
    score,
    label,
  };
}

/* -------------------------------------------------------------------------- */
/* EMPTY RESPONSE                                                              */
/* -------------------------------------------------------------------------- */

function emptyResponse() {
  return {
    summary: {
      totalOpportunities: 0,
      strongMatches: 0,
      warmMatches: 0,
      averageRelevance: 0,
    },

    topSignals: [],

    recentActivity: [],

    recommendations: [],

    proposalHealth: {
      score: 0,
      label: "No Opportunities",
    },
  };
}