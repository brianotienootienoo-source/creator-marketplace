import { Brand } from "../entities";

/**
 * Converts 6.x feed items → Brand entities
 * PURE TRANSFORMER ONLY
 */

export function feedToBrands(feedItems: any[]): Brand[] {
  return feedItems
    .filter((item) => item.type === "brand")
    .map((item) => {
      const b = item.data;

      return {
        id: b.id,
        slug: b.slug || b.name,
        name: b.name || "",
        industry: b.industry || "Unknown",
        description: b.description || "",
        logo: b.logo || "",
        bannerImage: b.bannerImage,
        website: b.website,
        verified: b.verified || false,
        targetAudience: b.targetAudience || {
          ageRanges: [],
          interests: [],
          locations: [],
        },
        preferredCreatorNiches: b.preferredCreatorNiches || [],
        activeCampaignIds: b.activeCampaignIds || [],
        socialLinks: b.socialLinks || [],
        partnershipCount: b.partnershipCount || 0,
        averageCampaignBudget: b.averageCampaignBudget,
        createdAt: b.createdAt || new Date().toISOString(),
      };
    });
}