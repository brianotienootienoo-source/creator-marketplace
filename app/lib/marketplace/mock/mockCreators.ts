import { Creator } from "../entities";

export const mockCreators: Creator[] = [
  {
    id: "creator_1",
    slug: "alex-visuals",
    displayName: "Alex Visuals",
    username: "@alexvisuals",
    bio: "Visual storyteller focused on tech, lifestyle, and cinematic edits.",
    niche: "Tech & Lifestyle",
    tags: ["tech", "cinematic", "editing", "lifestyle"],
    platforms: ["YouTube", "Instagram", "TikTok"],
    verified: true,
    avatar: "https://picsum.photos/200",
    bannerImage: "https://picsum.photos/800/300",
    stats: {
      followers: 250000,
      engagementRate: 6.2,
      averageViews: 120000,
      averageLikes: 8000,
    },
    audience: {
      primaryAgeRange: "18-34",
      topLocations: ["US", "UK", "Kenya"],
      interests: ["tech", "film", "gadgets"],
    },
    portfolio: [
      {
        id: "p1",
        title: "Tech Cinematic Ad",
        platform: "YouTube",
        thumbnail: "https://picsum.photos/300/200",
      },
    ],
    matchScore: 0,
    trendScore: 0,
    createdAt: new Date().toISOString(),
  },
];