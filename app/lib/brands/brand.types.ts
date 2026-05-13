/* -----------------------------
   BRAND CANONICAL DTO (SINGLE SOURCE CONTRACT)
------------------------------*/

export type BrandDTO = {
  id: string;
  name: string;
  description: string;
  category: string;

  demandScore: number;

  status: "active" | "paused" | "draft";

  budgetRange?: string;

  creatorFit?: string;

  campaignCount: number;
};