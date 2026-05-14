import { mockCreators } from "@/app/lib/marketplace/mock/mockCreators";
import { getCreatorUniverse } from "@/app/lib/creatorUniverse";

/**
 * 🧠 SINGLE SOURCE QUERY LAYER (7.5 FOUNDATION)
 * Extended safely with profile hydration layer
 * No UI changes — only abstraction expansion
 */

export function getAllCreators() {
  return mockCreators;
}

export function getHomeCreators() {
  return mockCreators.slice(0, 4);
}

export function getCreatorsForBrand(brand: string) {
  if (brand.toLowerCase() === "spotify") {
    return mockCreators.filter((c) =>
      c.niche?.toLowerCase().includes("music") ||
      c.niche?.toLowerCase().includes("entertainment")
    );
  }

  return mockCreators.slice(0, 3);
}

/**
 * 👤 PROFILE LAYER (HYDRATED ENTITY VIEW)
 * Uses universe when available, falls back to mock system safely
 */

export function getCreatorProfile(id: string) {
  const universeCreators = getCreatorUniverse?.();
  const creators = universeCreators || mockCreators;

  const creator = creators.find((c) => c.id === id);

  if (!creator) return null;

  return {
    id: creator.id,

    name:
      creator.name ||
      creator.displayName ||
      creator.username ||
      "Unknown Creator",

    username: creator.username,

    niche: creator.niche,

    bio: creator.bio,

    avatar: creator.avatar || creator.image,

    banner: creator.banner || creator.coverImage,

    platforms: creator.platforms || [],

    tags: creator.tags || [],

    audienceSize: creator.audienceSize || creator.followers,

    engagementRate: creator.engagementRate,

    rating: creator.rating,

    trustScore: creator.trustScore,

    featuredCampaigns: creator.featuredCampaigns || [],

    metrics: {
      followers: creator.followers,
      engagement: creator.engagementRate,
      growth: creator.growthScore,
    },

    raw: creator,
  };
}