export type CampaignStatus =
  | "draft"
  | "active"
  | "paused"
  | "completed";

export interface CampaignDeliverable {
  type: string;

  quantity: number;

  description?: string;
}

export interface CampaignTargetProfile {
  niches: string[];

  minimumFollowers?: number;

  preferredPlatforms: string[];

  targetLocations?: string[];
}

export interface Campaign {
  id: string;

  brandId: string;

  title: string;

  slug: string;

  description: string;

  budgetMin: number;

  budgetMax: number;

  currency: string;

  status: CampaignStatus;

  deliverables: CampaignDeliverable[];

  targetProfile: CampaignTargetProfile;

  deadline?: string;

  coverImage?: string;

  tags: string[];

  createdAt: string;
}