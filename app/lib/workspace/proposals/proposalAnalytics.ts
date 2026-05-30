import { db } from "../core/db";
import { Proposal } from "./proposalSchema";

export type ProposalAnalytics = {
  total: number;
  pending: number;
  accepted: number;
  rejected: number;
  byOpportunity: Record<string, number>;
  recent: Proposal[];
};

export function getProposalAnalytics(creatorId: string): ProposalAnalytics {
  const proposals = db.proposals.filter(
    (p) => p.creatorId === creatorId
  );

  const pending = proposals.filter((p) => p.status === "pending").length;
  const accepted = proposals.filter((p) => p.status === "accepted").length;
  const rejected = proposals.filter((p) => p.status === "rejected").length;

  const byOpportunity: Record<string, number> = {};

  for (const p of proposals) {
    byOpportunity[p.opportunityId] =
      (byOpportunity[p.opportunityId] || 0) + 1;
  }

  const recent = [...proposals]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  return {
    total: proposals.length,
    pending,
    accepted,
    rejected,
    byOpportunity,
    recent,
  };
}