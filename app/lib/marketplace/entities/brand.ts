export interface BrandTargetAudience {
  ageRanges: string[];

  interests: string[];

  locations: string[];
}

export interface BrandSocialLink {
  platform: string;

  url: string;
}

export interface Brand {
  id: string;

  slug: string;

  name: string;

  industry: string;

  description: string;

  logo: string;

  bannerImage?: string;

  website?: string;

  verified: boolean;

  targetAudience: BrandTargetAudience;

  preferredCreatorNiches: string[];

  activeCampaignIds: string[];

  socialLinks: BrandSocialLink[];

  partnershipCount: number;

  averageCampaignBudget?: number;

  createdAt: string;
}