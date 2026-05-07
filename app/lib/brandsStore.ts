// app/lib/brandsStore.ts

import { campaigns } from "@/app/data/campaigns";
import { normalizeBrandId } from "./brandUtils";

export type Brand = {
  id: string;
  name: string;
  description: string;
  category: string;
  demandScore: number;
  status: "active" | "inactive";
  budgetRange: string;
  creatorFit: string;
};

// 🔒 CENTRAL BRAND REGISTRY (derived from campaigns.ts)
export const brands: Brand[] = [
  {
    id: "netflix",
    name: "Netflix",
    description: "Global streaming platform producing original films and series.",
    category: "Entertainment",
    demandScore: 92,
    status: "active",
    budgetRange: "$300 - $800",
    creatorFit: "Film & TV creators",
  },
  {
    id: "nike",
    name: "Nike",
    description: "Leading global sportswear and performance brand.",
    category: "Fitness & Lifestyle",
    demandScore: 88,
    status: "active",
    budgetRange: "$200 - $1000",
    creatorFit: "Fitness & lifestyle creators",
  },
  {
    id: "spotify",
    name: "Spotify",
    description: "Digital music streaming service connecting artists and listeners.",
    category: "Music",
    demandScore: 85,
    status: "active",
    budgetRange: "$150 - $600",
    creatorFit: "Music creators",
  },
];


// 🧠 BASIC ACCESS HELPERS
export function getAllBrands(): Brand[] {
  return brands;
}

export function getBrandById(id: string): Brand | undefined {
  const normalized = normalizeBrandId(id);
  return brands.find((b) => b.id === normalized);
}


// 🧠 BRAND INTELLIGENCE HELPERS

export function getBrandCampaigns(brandId: string) {
  const id = normalizeBrandId(brandId);
  return campaigns.filter((c) => c.brandId === id);
}

export function getBrandStats(brandId: string) {
  const brandCampaigns = getBrandCampaigns(brandId);

  return {
    totalCampaigns: brandCampaigns.length,
    activeCampaigns: brandCampaigns.length,
    avgBudget: brandCampaigns.length > 0 ? "Mixed" : "N/A",
  };
}