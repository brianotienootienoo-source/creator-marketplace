export type ProposalMode = "simulation" | "live" | "hybrid";

/**
 * CENTRAL SWITCH FOR PROPOSAL INTELLIGENCE SYSTEM
 * Controls whether we use real signals, simulated signals, or both
 */
export function getProposalMode(): ProposalMode {
  // For now: safe simulation-first rollout
  return "simulation";
}