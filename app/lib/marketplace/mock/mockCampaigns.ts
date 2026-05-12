import { Campaign } from "../entities";

export const mockCampaigns: Campaign[] = [
  {
    id: "campaign_1",
    brandId: "brand_1",
    title: "Next Gen Creator Laptop Launch",
    slug: "creator-laptop-launch",
    description: "Promote the new NeoTech creator laptop series.",
    budgetMin: 2000,
    budgetMax: 8000,
    currency: "USD",
    status: "active",
    deliverables: [
      {
        type: "YouTube Video",
        quantity: 1,
        description: "Full review video",
      },
      {
        type: "Instagram Reel",
        quantity: 2,
      },
    ],
    targetProfile: {
      niches: ["Tech", "Lifestyle"],
      minimumFollowers: 50000,
      preferredPlatforms: ["YouTube", "Instagram"],
      targetLocations: ["Global"],
    },
    deadline: new Date(Date.now() + 7 * 86400000).toISOString(),
    coverImage: "https://picsum.photos/800/400",
    tags: ["tech", "laptop", "launch"],
    createdAt: new Date().toISOString(),
  },
];