import { Brand } from "../entities";

export const mockBrands: Brand[] = [
  {
    id: "brand_1",
    slug: "neo-tech",
    name: "NeoTech",
    industry: "Consumer Electronics",
    description: "Next-gen smart devices for modern creators.",
    logo: "https://picsum.photos/100",
    bannerImage: "https://picsum.photos/900/300",
    website: "https://example.com",
    verified: true,
    targetAudience: {
      ageRanges: ["18-34"],
      interests: ["tech", "gadgets", "innovation"],
      locations: ["Global"],
    },
    preferredCreatorNiches: ["Tech", "Lifestyle"],
    activeCampaignIds: ["campaign_1"],
    socialLinks: [
      {
        platform: "Instagram",
        url: "https://instagram.com",
      },
    ],
    partnershipCount: 12,
    averageCampaignBudget: 5000,
    createdAt: new Date().toISOString(),
  },
];