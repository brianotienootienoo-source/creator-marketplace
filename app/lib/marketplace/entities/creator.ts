export type CreatorPlatform =
  | "TikTok"
  | "YouTube"
  | "Instagram"
  | "Twitch"
  | "X"
  | "LinkedIn";

export type CreatorType =
  | "influencer"
  | "musician"
  | "comedian"
  | "dj"
  | "speaker"
  | "hybrid";

export type OpportunityMode =
  | "brand_deals"
  | "bookings"
  | "sponsorships"
  | "live_performance";

export interface CreatorStats {
  followers: number;

  /**
   * Normalized expectation:
   * - can be 0–1 OR 0–100 depending on ingestion layer
   * - feed layer is responsible for normalization
   */
  engagementRate: number;

  averageViews: number;
  averageLikes: number;
}

export interface CreatorAudience {
  primaryAgeRange: string;
  topLocations: string[];
  interests: string[];
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  platform: CreatorPlatform;
  thumbnail: string;
  url?: string;
}

/**
 * BOOKING LAYER (FOR DJs, MUSICIANS, LIVE PERFORMERS)
 */
export interface CreatorBooking {
  eventTypes: Array<
    "wedding" | "club" | "corporate" | "festival" | "private_party"
  >;

  locationRadiusKm?: number;

  baseFee?: number;

  availability?: "available" | "busy" | "on_tour";
}

export interface Creator {
  /**
   * SYSTEM ID (PRIMARY KEY)
   */
  id: string;

  /**
   * URL + SEO identity
   */
  slug: string;

  /**
   * DISPLAY NAME
   */
  displayName: string;

  /**
   * HANDLE (used as @username)
   */
  username: string;

  bio: string;

  niche: string;
  tags: string[];

  /**
   * CREATOR CLASSIFICATION LAYER
   */
  creatorTypes: CreatorType[];

  /**
   * HOW THEY MAKE MONEY
   */
  opportunityModes: OpportunityMode[];

  platforms: CreatorPlatform[];

  verified: boolean;

  /**
   * VISUALS
   */
  avatar: string;
  bannerImage?: string;

  /**
   * REACH LAYER
   */
  stats: CreatorStats;

  /**
   * PLATFORM-SPECIFIC FOLLOWER BREAKDOWN
   */
  platformFollowers?: {
    youtube?: number;
    tiktok?: number;
    instagram?: number;
    twitch?: number;
    x?: number;
  };

  /**
   * INTELLIGENCE / RANKING
   */
  ratingScore: number;

  /**
   * AUDIENCE LAYER
   */
  audience: CreatorAudience;

  /**
   * PROOF LAYER
   */
  portfolio: CreatorPortfolioItem[];

  /**
   * BOOKING / PERFORMANCE LAYER
   */
  booking?: CreatorBooking;

  /**
   * FEED-DRIVEN SIGNALS (DO NOT MANUALLY SET IN UI)
   */
  matchScore?: number;
  trendScore?: number;

  createdAt: string;
}