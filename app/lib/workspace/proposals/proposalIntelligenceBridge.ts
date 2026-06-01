import { getProposalSignal } from "./proposalSignalEngine";
import { campaigns } from "@/app/data/campaigns";
import { creators } from "@/app/data/creators";
import { getSimulatedProposalSignals } from "./proposalSimulationLayer";

/**
 * 🔗 PROPOSAL INTELLIGENCE BRIDGE (A2 CORE)
 *
 * ALL-BUT-LAYERED MODEL + STEP 4 EXTENSIONS:
 * - Live signals = truth layer
 * - Simulation signals = stabilizer layer
 * - Memory drift = behavioral continuity layer
 * - Time decay = freshness control layer
 */

/* -------------------------------------------------------------------------- */
/* MEMORY STORE                                                               */
/* -------------------------------------------------------------------------- */

type CreatorMemory = {
  creatorId: string;
  avgRelevance: number;
  avgConversion: number;
  lastUpdated: number;
};

const memoryStore: Record<string, CreatorMemory> = {};

/* -------------------------------------------------------------------------- */
/* MAIN ENGINE                                                                */
/* -------------------------------------------------------------------------- */

export function getProposalIntelligence(creatorId: string) {
  const creator = creators.find((c) => c.id === creatorId);

  if (!creator) return emptyResponse();

  /**
   * 1. LIVE LAYER
   */
  const liveSignals = campaigns.map((campaign) => {
    const signal = getProposalSignal(
      creator as any,
      campaign as any,
      { surface: "dashboard" }
    );

    return {
      campaignId: campaign.id,
      title: campaign.title,
      brandId: campaign.brandId,
      signal,
    };
  });

  /**
   * 2. SIMULATION LAYER
   */
  const simulatedSignals = getSimulatedProposalSignals(creatorId);

  /**
   * 3. ALL-BUT-LAYERED BLEND
   */
  const signals = campaigns.map((campaign) => {
    const live = liveSignals.find((l) => l.campaignId === campaign.id);
    const sim = simulatedSignals.find((s) => s.campaignId === campaign.id);

    const l = live?.signal;
    const s = sim;

    const wLive = l ? 0.7 : 0;
    const wSim = 0.3;

    let relevanceScore = blend(l?.relevanceScore, s?.relevanceScore, wLive, wSim);
    let conversionProbability = blend(l?.conversionProbability, s?.conversionProbability, wLive, wSim);
    let urgencyScore = blend(l?.urgencyScore, s?.urgencyScore, wLive, wSim);
    let confidence = blend(l?.confidence, s?.confidence, wLive, wSim);

    // STEP 4A — MEMORY DRIFT
    relevanceScore = applyMemoryBias(creatorId, relevanceScore);

    // STEP 4B — TIME DECAY
    const syntheticTimestamp =
      Date.now() - campaigns.indexOf(campaign) * 1000 * 60 * 60 * 6;

    relevanceScore = applyTimeDecay(relevanceScore, syntheticTimestamp);

    return {
      campaignId: campaign.id,
      title: campaign.title,
      brandId: campaign.brandId,
      signal: {
        relevanceScore,
        conversionProbability,
        urgencyScore,
        confidence,
        reasons: l?.reasons?.length
          ? l.reasons
          : s?.source
          ? [`simulated:${s.source}`]
          : ["unscored"],
      },
    };
  });

  /**
   * 4. SORTING
   */
  const sorted = [...signals].sort(
    (a, b) => b.signal.relevanceScore - a.signal.relevanceScore
  );

  const topSignals = sorted.slice(0, 5);

  /**
   * 5. MEMORY UPDATE
   */
  updateCreatorMemory(creatorId, signals);

  /**
   * 6. RESPONSE
   */
  return {
    summary: buildSummary(sorted),
    topSignals,
    recentActivity: generateRecentActivity(topSignals),
    recommendations: generateRecommendations(topSignals),
    proposalHealth: buildProposalHealth(topSignals),

    meta: {
      mode: "all-but-layered-v2",
      liveWeight: 0.7,
      simulationWeight: 0.3,
      memoryEnabled: true,
      decayEnabled: true,
      source: "A2_LAYERED_BRIDGE_V4",
    },
  };
}

/* -------------------------------------------------------------------------- */
/* BLEND                                                                     */
/* -------------------------------------------------------------------------- */

function blend(live?: number, sim?: number, wLive = 0, wSim = 0): number {
  const l = live ?? 0;
  const s = sim ?? l;

  const sum = wLive + wSim;
  if (sum === 0) return Math.round(l);

  return Math.round((l * wLive + s * wSim) / sum);
}

/* -------------------------------------------------------------------------- */
/* MEMORY                                                                    */
/* -------------------------------------------------------------------------- */

function updateCreatorMemory(creatorId: string, signals: any[]) {
  const avgRelevance =
    signals.reduce((s, i) => s + i.signal.relevanceScore, 0) /
    signals.length;

  const avgConversion =
    signals.reduce((s, i) => s + i.signal.conversionProbability, 0) /
    signals.length;

  memoryStore[creatorId] = {
    creatorId,
    avgRelevance,
    avgConversion,
    lastUpdated: Date.now(),
  };
}

function applyMemoryBias(creatorId: string, score: number) {
  const memory = memoryStore[creatorId];
  if (!memory) return score;

  const drift = (memory.avgRelevance - 50) * 0.1;
  return Math.max(0, Math.min(100, score + drift));
}

/* -------------------------------------------------------------------------- */
/* TIME DECAY                                                                */
/* -------------------------------------------------------------------------- */

function applyTimeDecay(score: number, timestamp: number) {
  const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
  const decay = Math.min(ageHours * 0.02, 20);

  return Math.max(0, score - decay);
}

/* -------------------------------------------------------------------------- */
/* SUMMARY                                                                    */
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
            signals.reduce((sum, i) => sum + i.signal.relevanceScore, 0) /
              signals.length
          )
        : 0,
  };
}

/* -------------------------------------------------------------------------- */

function generateRecentActivity(signals: any[]) {
  return signals.map((i) => ({
    id: i.campaignId,
    title: i.title,
    status:
      i.signal.conversionProbability >= 75
        ? "high-potential"
        : "warm-opportunity",
    relevanceScore: i.signal.relevanceScore,
  }));
}

function generateRecommendations(signals: any[]) {
  return signals.slice(0, 3).map((i) => ({
    campaignId: i.campaignId,
    title: i.title,
    relevanceScore: i.signal.relevanceScore,
    conversionProbability: i.signal.conversionProbability,
  }));
}

function buildProposalHealth(signals: any[]) {
  if (!signals.length) return { score: 0, label: "No Opportunities" };

  const avg =
    signals.reduce((s, i) => s + i.signal.relevanceScore, 0) /
    signals.length;

  const score = Math.round(avg);

  let label = "Developing";
  if (score >= 80) label = "Excellent";
  else if (score >= 65) label = "Strong";
  else if (score >= 50) label = "Healthy";

  return { score, label };
}

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
    meta: {
      mode: "empty",
      source: "A2_LAYERED_BRIDGE_V4",
    },
  };
}