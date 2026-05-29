export type OpportunityMedia = {
  id: string;
  url: string;
  type?: "image" | "video";
};

export type OpportunityInstruction = {
  id: string;
  text: string;
};

export type OpportunityContext = {
  brandStory?: string;
  brandValues?: string[];
  notes?: string;
};

export type Opportunity = {
  id: string;

  title: string;
  brandId: string;

  category: string;

  description: string;

  budgetMin?: number;
  budgetMax?: number;

  location?: string;

  timeline?: string;

  deliverables: string[];

  match: "High Match" | "Recommended" | "Trending";

  createdAt?: string;
};