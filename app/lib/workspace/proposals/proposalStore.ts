import { db } from "../core/db";
import { Proposal } from "./proposalSchema";

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

export function getProposals() {
  return db.proposals;
}

export function getProposalsByCreator(creatorId: string) {
  return db.proposals.filter((p) => p.creatorId === creatorId);
}