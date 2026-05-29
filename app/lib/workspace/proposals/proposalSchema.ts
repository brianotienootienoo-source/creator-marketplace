export type ProposalStatus = "pending" | "accepted" | "rejected";

export type Proposal = {
  id: string;

  opportunityId: string;
  brandId: string;
  creatorId: string;

  message: string;

  status: ProposalStatus;

  createdAt: string;
};