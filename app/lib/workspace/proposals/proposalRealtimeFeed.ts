import { getProposalIntelligence } from "./proposalIntelligenceBridge";

/**
 * ⚡ REAL-TIME PROPOSAL FEED (A2 STREAM LAYER)
 */

export function getProposalRealtimeFeed(creatorId: string) {
  const intelligence = getProposalIntelligence(creatorId);

  const feed = intelligence.topSignals.map((item) => {
    const score = item.signal.relevanceScore;

    return {
      id: item.campaignId,
      title: item.title,
      brandId: item.brandId,
      message: buildMessage(item.title, score),
      impactScore: score,
      timestamp: Date.now(),
    };
  });

  return feed.sort((a, b) => b.impactScore - a.impactScore);
}

/* ---------------- HELPERS ---------------- */

function buildMessage(title: string, score: number): string {
  if (score > 80) return `High-value opportunity detected: ${title}`;
  if (score > 60) return `Strong match identified: ${title}`;
  return `New opportunity available: ${title}`;
}