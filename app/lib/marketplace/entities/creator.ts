export type CreatorPlatform =
  | "TikTok"
  | "YouTube"
  | "Instagram"
  | "Twitch"
  | "X"
  | "LinkedIn";

export interface CreatorStats {
  followers: number;

  /**
   * IMPORTANT:
   * Normalized expectation:
   * - system may ingest 0–1 OR 0–100
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

export interface Creator {
  /**
   * SYSTEM ID (PRIMARY KEY)
   */
  id: string;

  /**
   * URL + SEO identity (future routing layer)
   */
  slug: string;

  /**
   * DISPLAY NAME (UI primary label)
   */
  displayName: string;

  /**
   * HANDLE (MUST be used as @username in UI)
   * Example: alexvisuals
   */
  username: string;

  /**
   * BIO (profile description)
   */
  bio: string;

  /**
   * CONTENT NICHE (used in discovery + filtering)
   */
  niche: string;

  tags: string[];

  platforms: CreatorPlatform[];
  verified: boolean;

  /**
   * PRIMARY VISUALS
   */
  avatar: string;

  /**
   * OPTIONAL FIELD
   * BUT NOW CONSUMERS MUST ASSUME IT ALWAYS EXISTS
   * (enforced via creatorUniverse fallback)
   */
  bannerImage?: string;

  stats: CreatorStats;

  /**
   * Unified rating input for CreatorCard + feed system
   * (7.8 rating system contract)
   */
  ratingScore: number;

  audience: CreatorAudience;

  portfolio: CreatorPortfolioItem[];

  /**
   * Feed system outputs (do not manually set in UI)
   */
  matchScore?: number;
  trendScore?: number;

  createdAt: string;
}