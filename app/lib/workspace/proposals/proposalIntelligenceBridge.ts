import { getProposalSignal } from "./proposalSignalEngine";
import { campaigns } from "@/app/data/campaigns";
import { creators } from "@/app/data/creators";

/**
 * 🔗 PROPOSAL INTELLIGENCE BRIDGE (A2 CORE)
 * Connects raw marketplace data → proposal intelligence layer
 */

export function getProposalIntelligence(creatorId: string) {
  const creator = creators.find((c) => c.id === creatorId);

  if (!creator) return emptyResponse();

  const signals = campaigns.map((campaign) => {
    const signal = getProposalSignal(creator, campaign, {
      surface: "dashboard",
    });

    return {
      campaignId: campaign.id,
      title: campaign.title,
      brandId: campaign.brandId,
      signal,
    };
  });

  const sorted = signals.sort(
    (a, b) => b.signal.relevanceScore - a.signal.relevanceScore
  );

  return {
    summary: buildSummary(sorted),
    topSignals: sorted.slice(0, 5),
    recentActivity: generateRecentActivity(sorted),
  };
}

/* ---------------- HELPERS ---------------- */

function buildSummary(signals: any[]) {
  return {
    totalProposals: signals.length,
    pendingProposals: Math.floor(signals.length * 0.6),
    acceptedProposals: Math.floor(signals.length * 0.25),
    rejectedProposals: Math.floor(signals.length * 0.15),
  };
}

function generateRecentActivity(signals: any[]) {
  return signals.slice(0, 5).map((s) => ({
    id: s.campaignId,
    opportunityId: s.title,
    status:
      s.signal.conversionProbability > 70
        ? "high-potential"
        : "warm",
  }));
}

function emptyResponse() {
  return {
    summary: {
      totalProposals: 0,
      pendingProposals: 0,
      acceptedProposals: 0,
      rejectedProposals: 0,
    },
    topSignals: [],
    recentActivity: [],
  };
}