import { creators as legacyCreators } from "@/app/data/creators";
import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";
import { Creator } from "@/app/lib/marketplace/entities/creators";

/* -----------------------------
   NORMALIZED CREATORS (SAFE UTILITY ONLY)
------------------------------*/
const creators: Creator[] = adaptLegacyCreators(legacyCreators);

/* -----------------------------
   FEATURED CREATORS (SAFE)
------------------------------*/
export function getFeaturedCreators() {
  return [...creators]
    .sort((a, b) => b.stats.followers - a.stats.followers)
    .slice(0, 6);
}

/* -----------------------------
   TRENDS (STATIC UTILITY - SAFE)
------------------------------*/
export function getTrendingCategories() {
  return [
    { name: "Music", trend: 92 },
    { name: "Comedy", trend: 78 },
    { name: "Influencers", trend: 88 },
    { name: "Brands", trend: 81 },
  ];
}

/* -----------------------------
   🚨 DEPRECATED BRAND LAYER (INTENTIONALLY REMOVED)
   This function used to exist:
     getBrandOpportunities()

   It has been migrated to:
     app/lib/brandUniverse.ts

   Any imports referencing it MUST be updated.
------------------------------*/