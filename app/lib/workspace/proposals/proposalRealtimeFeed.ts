import { getProposalIntelligence } from "./proposalIntelligenceBridge";

/**
 * ⚡ REAL-TIME PROPOSAL FEED (A2 STREAM CORE v2)
 *
 * Upgrade:
 * - Now emits structured "events"
 * - Supports ranking + urgency + interaction simulation
 * - Prepares system for live streaming layer
 */

export type ProposalFeedEvent = {
  id: string;
  type: "opportunity" | "high_priority" | "warm" | "trend_spike";
  title: string;
  brandId: string;

  impactScore: number;
  relevanceScore: number;
  conversionProbability: number;

  urgencyLevel: "low" | "medium" | "high";
  signalStrength: number;

  message: string;

  timestamp: number;
};

export function getProposalRealtimeFeed(creatorId: string) {
  const intelligence = getProposalIntelligence(creatorId);

  const raw = intelligence.topSignals;

  const events: ProposalFeedEvent[] = raw.map((item) => {
    const r = item.signal.relevanceScore;
    const c = item.signal.conversionProbability;
    const u = item.signal.urgencyScore;

    const impactScore = Math.round((r * 0.5 + c * 0.3 + u * 0.2));

    return {
      id: item.campaignId,

      type: resolveType(r, c, u),

      title: item.title,
      brandId: item.brandId,

      impactScore,
      relevanceScore: r,
      conversionProbability: c,

      urgencyLevel: resolveUrgency(u),
      signalStrength: Math.round((r + c + u) / 3),

      message: buildMessage(item.title, r, c),

      timestamp: Date.now(),
    };
  });

  return sortAndBoost(events);
}

/* ---------------- CORE STREAM LOGIC ---------------- */

function resolveType(
  r: number,
  c: number,
  u: number
): ProposalFeedEvent["type"] {
  if (r > 80 && c > 75) return "high_priority";
  if (u > 70) return "trend_spike";
  if (r > 60) return "opportunity";
  return "warm";
}

function resolveUrgency(
  u: number
): ProposalFeedEvent["urgencyLevel"] {
  if (u > 75) return "high";
  if (u > 50) return "medium";
  return "low";
}

function buildMessage(
  title: string,
  r: number,
  c: number
): string {
  if (r > 80 && c > 70) {
    return `High-conversion match detected: ${title}`;
  }

  if (r > 70) {
    return `Strong opportunity identified: ${title}`;
  }

  return `New campaign opportunity: ${title}`;
}

/* ---------------- STREAM BRAIN ---------------- */

function sortAndBoost(events: ProposalFeedEvent[]) {
  return events
    .sort((a, b) => {
      // primary: impact score
      if (b.impactScore !== a.impactScore) {
        return b.impactScore - a.impactScore;
      }

      // secondary: urgency
      const urgencyWeight = { low: 1, medium: 2, high: 3 };
      return (
        urgencyWeight[b.urgencyLevel] -
        urgencyWeight[a.urgencyLevel]
      );
    })
    .map((event, index) => ({
      ...event,

      // subtle feed injection bias (for realism)
      feedRank: index + 1,
      isTopSignal: index < 3,
    }));
}