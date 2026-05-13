import { Creator } from "../entities/creators";

export const mockCreators: Creator[] = [
  {
    id: "c1",
    slug: "luna",
    displayName: "Luna Ray",
    username: "luna",
    bio: "Music creator blending electronic and soulful sounds.",
    niche: "Music",
    tags: ["music", "electronic", "live"],
    creatorTypes: ["musician", "influencer"],
    opportunityModes: ["brand_deals", "live_performance"],
    platforms: ["Instagram", "TikTok", "YouTube"],
    verified: false,

    avatar: "https://i.pravatar.cc/150?img=12",
    bannerImage: "https://i.pravatar.cc/600?img=12",

    stats: {
      followers: 12000,
      engagementRate: 0.065,
      averageViews: 5000,
      averageLikes: 800,
    },

    platformFollowers: {
      instagram: 6000,
      tiktok: 4000,
      youtube: 2000,
    },

    ratingScore: 35,

    audience: {
      primaryAgeRange: "18-24",
      topLocations: ["US", "UK"],
      interests: ["music", "lifestyle"],
    },

    portfolio: [
      {
        id: "p1",
        title: "Live set clip",
        platform: "Instagram",
        thumbnail: "https://i.pravatar.cc/300?img=12",
      },
    ],

    booking: {
      eventTypes: ["club", "festival"],
      locationRadiusKm: 50,
      baseFee: 200,
      availability: "available",
    },

    createdAt: new Date().toISOString(),
  },

  {
    id: "c2",
    slug: "jaycomedy",
    displayName: "Jay Comedy",
    username: "jaycomedy",
    bio: "Stand-up comedian creating viral sketches.",
    niche: "Comedy",
    tags: ["comedy", "sketch", "viral"],
    creatorTypes: ["comedian", "influencer"],
    opportunityModes: ["brand_deals", "sponsorships"],
    platforms: ["TikTok", "Instagram"],
    verified: false,

    avatar: "https://i.pravatar.cc/150?img=32",
    bannerImage: "https://i.pravatar.cc/600?img=32",

    stats: {
      followers: 95000,
      engagementRate: 0.032,
      averageViews: 40000,
      averageLikes: 5000,
    },

    platformFollowers: {
      tiktok: 70000,
      instagram: 25000,
    },

    ratingScore: 55,

    audience: {
      primaryAgeRange: "18-34",
      topLocations: ["US", "CA"],
      interests: ["comedy", "memes"],
    },

    portfolio: [
      {
        id: "p2",
        title: "Viral sketch",
        platform: "TikTok",
        thumbnail: "https://i.pravatar.cc/300?img=32",
      },
    ],

    createdAt: new Date().toISOString(),
  },

  {
    id: "c3",
    slug: "mika",
    displayName: "Mika Vlogs",
    username: "mika",
    bio: "Lifestyle influencer sharing daily experiences.",
    niche: "Influencer",
    tags: ["lifestyle", "vlogs"],
    creatorTypes: ["influencer"],
    opportunityModes: ["brand_deals"],
    platforms: ["YouTube", "Instagram", "TikTok"],
    verified: false,

    avatar: "https://i.pravatar.cc/150?img=45",
    bannerImage: "https://i.pravatar.cc/600?img=45",

    stats: {
      followers: 260000,
      engagementRate: 0.058,
      averageViews: 90000,
      averageLikes: 12000,
    },

    platformFollowers: {
      youtube: 150000,
      instagram: 80000,
      tiktok: 30000,
    },

    ratingScore: 72,

    audience: {
      primaryAgeRange: "16-28",
      topLocations: ["US", "UK", "CA"],
      interests: ["lifestyle", "fashion"],
    },

    portfolio: [],

    createdAt: new Date().toISOString(),
  },

  {
    id: "c4",
    slug: "nova",
    displayName: "Nova Beats",
    username: "nova",
    bio: "DJ and producer performing at clubs and festivals.",
    niche: "Music",
    tags: ["dj", "beats", "live"],
    creatorTypes: ["dj", "musician"],
    opportunityModes: ["bookings", "live_performance", "brand_deals"],
    platforms: ["Instagram", "YouTube", "TikTok"],
    verified: true,

    avatar: "https://i.pravatar.cc/150?img=22",
    bannerImage: "https://i.pravatar.cc/600?img=22",

    stats: {
      followers: 1900000,
      engagementRate: 0.085,
      averageViews: 500000,
      averageLikes: 60000,
    },

    platformFollowers: {
      instagram: 900000,
      youtube: 700000,
      tiktok: 300000,
    },

    ratingScore: 88,

    audience: {
      primaryAgeRange: "18-35",
      topLocations: ["EU", "US"],
      interests: ["music", "nightlife"],
    },

    portfolio: [
      {
        id: "p4",
        title: "Club set",
        platform: "YouTube",
        thumbnail: "https://i.pravatar.cc/300?img=22",
      },
    ],

    booking: {
      eventTypes: ["club", "festival", "corporate"],
      locationRadiusKm: 200,
      baseFee: 500,
      availability: "on_tour",
    },

    createdAt: new Date().toISOString(),
  },
];