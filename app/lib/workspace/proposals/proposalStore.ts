import { db } from "../core/db";
import { Proposal } from "./proposalSchema";

/**
 * PROPOSAL LIFECYCLE STATES
 */
export type ProposalStatus =
  | "pending"
  | "viewed"
  | "shortlisted"
  | "accepted"
  | "rejected";

/**
 * CREATE PROPOSAL
 */
export function createProposal(
  input: Omit<Proposal, "id" | "createdAt" | "status">
) {
  const exists = db.proposals.find(
    (p) =>
      p.opportunityId === input.opportunityId &&
      p.creatorId === input.creatorId
  );

  if (exists) {
    return { ok: false, message: "Already applied" };
  }

  const newProposal: Proposal = {
    id: `${Date.now()}`,
    status: "pending",
    createdAt: new Date().toISOString(),
    ...input,
  };

  db.proposals.push(newProposal);

  return { ok: true, proposal: newProposal };
}

/**
 * GET ALL PROPOSALS
 */
export function getProposals() {
  return db.proposals;
}

/**
 * GET BY CREATOR
 */
export function getProposalsByCreator(creatorId: string) {
  return db.proposals.filter((p) => p.creatorId === creatorId);
}

/**
 * INTERNAL STATE UPDATE HELPER
 */
function updateProposalStatus(
  proposalId: string,
  status: ProposalStatus
) {
  const proposal = db.proposals.find((p) => p.id === proposalId);

  if (!proposal) {
    return { ok: false, message: "Proposal not found" };
  }

  proposal.status = status;

  return { ok: true, proposal };
}

/**
 * LIFECYCLE ACTIONS
 */

export function markProposalViewed(proposalId: string) {
  return updateProposalStatus(proposalId, "viewed");
}

export function shortlistProposal(proposalId: string) {
  return updateProposalStatus(proposalId, "shortlisted");
}

export function acceptProposal(proposalId: string) {
  return updateProposalStatus(proposalId, "accepted");
}

export function rejectProposal(proposalId: string) {
  return updateProposalStatus(proposalId, "rejected");
}

/**
 * OPTIONAL FILTER HELPERS (SAFE ADDITION)
 */
export function getProposalsByStatus(status: ProposalStatus) {
  return db.proposals.filter((p) => p.status === status);
}