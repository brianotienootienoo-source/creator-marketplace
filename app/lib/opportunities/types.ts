export type OpportunityStatus =
  | "draft"
  | "active"
  | "paused"
  | "closed";

export type Opportunity = {
  id: string;

  brandId: string;
  title: string;
  description: string;

  category: string;
  niche?: string[];

  budgetMin?: number;
  budgetMax?: number;
  currency: string;

  timeline?: string;
  location?: string;
  remote: boolean;

  deliverables: string[];

  status: OpportunityStatus;

  createdAt: string;
  updatedAt: string;
};

export type OpportunityMedia = {
  id: string;
  opportunityId: string;
  type: "image" | "video" | "pdf" | "link";
  url: string;
  title?: string;
  description?: string;
};

export type OpportunityInstruction = {
  id: string;
  opportunityId: string;
  text: string;
  priority: "low" | "medium" | "high";
};

export type OpportunityApplication = {
  id: string;
  opportunityId: string;
  creatorId: string;

  status: "pending" | "reviewing" | "accepted" | "rejected" | "withdrawn";

  message?: string;

  appliedAt: string;
  updatedAt: string;
};

export type OpportunityMatchInsight = {
  id: string;
  opportunityId: string;
  creatorId: string;

  reasons: string[];
  matchScore: number;

  generatedAt: string;
};

export type OpportunityBrandContext = {
  id: string;
  opportunityId: string;

  brandStory?: string;
  campaignGoal?: string;
  toneOfVoice?: string;
};