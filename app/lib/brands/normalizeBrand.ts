import { BrandDTO } from "./brand.types";

/* -----------------------------
   SAFE BRAND NORMALIZER (GUARDS ALL INPUTS)
------------------------------*/
export function normalizeBrand(b: any): BrandDTO {
  return {
    id: (b?.id ?? "").toLowerCase(),

    name: b?.name ?? "Unknown Brand",

    description: b?.description ?? b?.desc ?? "",

    category: b?.category ?? b?.niche ?? "General",

    demandScore: b?.demandScore ?? b?.demand ?? 0,

    status: b?.status ?? "active",

    budgetRange: b?.budgetRange,

    creatorFit: b?.creatorFit,

    campaignCount: b?.campaignCount ?? 0,
  };
}