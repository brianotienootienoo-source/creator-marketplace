/* =========================================================
   BRAND CONTRACT LOCK V2
   SINGLE SOURCE OF TRUTH TYPES
========================================================= */

/* -----------------------------
   CORE BRAND ENTITY
------------------------------*/
export interface BrandContract {
  id: string;

  name: string;

  description: string;

  category: string;

  demandScore: number;

  status?: string;

  budgetRange?: string;

  creatorFit?: string[];

  campaignCount?: number;
}

/* -----------------------------
   MATCH ENTITY
------------------------------*/
export interface BrandMatchContract {
  id: string;

  brandId?: string;

  creatorId?: string;

  name?: string;

  category?: string;

  avatar?: string;

  followers?: number;

  score: number;

  trend?: string;

  trendColor?: string;

  reason?: string;
}

/* -----------------------------
   BRAND METRICS ENTITY
------------------------------*/
export interface BrandMetricsContract {
  totalCampaigns: number;

  activeCampaigns: number;

  estimatedBudget: number;

  demandScore: number;

  dominantNiche: string;

  intensity: "Low" | "Medium" | "High";
}

/* -----------------------------
   BRAND INTELLIGENCE ENTITY
------------------------------*/
export interface BrandIntelligenceContract {
  brandId: string;

  totalMatches: number;

  avgScore: number;

  demandScore: number;

  topMatches: BrandMatchContract[];
}