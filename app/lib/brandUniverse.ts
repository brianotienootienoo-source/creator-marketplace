import { getAllBrands } from "@/app/lib/brandsStore";
import { campaigns } from "@/app/data/campaigns";

/* -----------------------------
   UNIFIED BRAND DTO (SOURCE OF TRUTH)
------------------------------*/
export function getBrandUniverse() {
  const brands = getAllBrands();

  return brands.map((b) => {
    const relatedCampaigns = campaigns.filter(
      (c) => c.brandId === b.id
    );

    const activeCampaigns = relatedCampaigns.length;

    const demandScore =
      b.demandScore + activeCampaigns * 2;

    return {
      id: b.id,
      name: b.name,
      description: b.description,
      category: b.category,

      demandScore,

      status: b.status,
      budgetRange: b.budgetRange,
      creatorFit: b.creatorFit,

      campaignCount: activeCampaigns,
    };
  });
}