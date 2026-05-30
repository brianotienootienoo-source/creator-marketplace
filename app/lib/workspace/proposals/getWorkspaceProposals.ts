import { proposals } from "@/app/lib/proposals";
import { getProposalIntelligence } from "@/app/lib/proposals/proposalIntelligenceEngine";

/**
 * 🧠 WORKSPACE PROPOSALS INTELLIGENCE LAYER
 * Converts raw proposals → ranked intelligence objects for UI
 */

export function getWorkspaceProposals() {
  return proposals
    .map((proposal) => {
      const intelligence = getProposalIntelligence(proposal, {
        surface: "workspace",
      });

      return {
        ...proposal,

        // 🔥 injected intelligence layer
        intelligence,
      };
    })
    .sort((a, b) => b.intelligence.score - a.intelligence.score);
}