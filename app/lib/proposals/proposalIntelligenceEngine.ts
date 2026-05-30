import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";
import { getCreatorReadiness } from "@/app/lib/marketplace/intelligence/creatorReadiness";

type Proposal = any;
type Context = {
  surface: "workspace" | "feed" | "marketplace";
};

/**
 * 🧠 PROPOSAL INTELLIGENCE ENGINE (A2)
 * Converts static proposals into ranked, real-time intelligence objects
 */
export function getProposalIntelligence(
  proposal: Proposal,
  context: Context = { surface: "workspace" }
) {
  const creator = proposal.creator;

  // 1. CORE SIGNAL (shared brain)
  const signal = getUnifiedSignal(creator, {
    surface: context.surface,
  });

  // 2. READINESS LAYER (opportunity fit)
  const readiness = getCreatorReadiness(creator);

  // 3. PROPOSAL-SPECIFIC BOOSTS
  const urgencyBoost =
    proposal.status === "pending" ? 10 :
    proposal.status === "accepted" ? 20 : 0;

  const matchBoost =
    (proposal.matchScore ?? 0) * 0.2;

  // 4. FINAL INTELLIGENCE SCORE
  const score =
    signal.score * 0.6 +
    readiness.score * 0.25 +
    urgencyBoost * 0.1 +
    matchBoost * 0.05;

  return {
    proposalId: proposal.id,

    score: Math.max(0, Math.min(100, score)),

    signal,
    readiness,

    status: proposal.status,

    insights: [
      ...signal.reasons,
      `Readiness: ${readiness.tier}`,
      `Surface: ${context.surface}`,
    ],

    priority:
      score > 75 ? "HIGH" :
      score > 50 ? "MEDIUM" : "LOW",
  };
}