import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { buildMatches } from "@/app/lib/matchEngine";

import type {
  BrandContract,
  BrandMatchContract,
} from "@/app/lib/contracts/brandContracts";

/* -----------------------------
   TYPES
------------------------------*/
type FeedItem =
  | {
      type: "creator";
      id: string;
      name: string;
      category: string;
      avatar: string;
      score: number;
      trend?: string;
      trendColor?: string;
    }
  | {
      type: "brand";
      id: string;
      name: string;
      subtitle: string;
      score: number;
    }
  | {
      type: "match";
      id: string;
      name: string;
      subtitle: string;
      score: number;
    };

/* -----------------------------
   SEED (STABLE)
------------------------------*/
let cachedSeed: number | null = null;

function getSeed() {
  if (!cachedSeed) {
    cachedSeed = Date.now();
  }
  return cachedSeed;
}

/* -----------------------------
   JITTER
------------------------------*/
function jitter(seed: number, index: number) {
  const x = Math.sin(seed * 0.001 + index * 999) * 10000;
  return (x - Math.floor(x)) * 2 - 1;
}

/* -----------------------------
   NORMALIZATION
------------------------------*/
function normalizeCreatorScore(score: number) {
  return Math.log10((score ?? 0) + 1) * 40;
}

function normalizeBrandScore(demandScore: number) {
  return Math.log10((demandScore ?? 1) + 1) * 50;
}

/* -----------------------------
   CREATOR ADAPTER (UNIVERSE SAFE LAYER)
------------------------------*/
function mapCreator(c: any) {
  return {
    id: c.id,
    name: c.name ?? c.displayName ?? c.username,
    category: c.category ?? c.niche ?? "Creator",
    avatar: c.avatar ?? "",
    score: c.score ?? c.ratingScore ?? 0,
    trend: c.trend,
    trendColor: c.trendColor,
  };
}

/* -----------------------------
   MAIN FEED
------------------------------*/
export function buildFeedV2(): FeedItem[] {
  const seed = getSeed();

  const creators = getCreatorUniverse().map(mapCreator);

  const brands: BrandContract[] = getBrandUniverse();

  const matches: BrandMatchContract[] = buildMatches();

  const feed: FeedItem[] = [];

  /* -----------------------------
     CREATORS
  ------------------------------*/
  feed.push(
    ...creators.map((c, i) => ({
      type: "creator" as const,
      id: c.id,
      name: c.name,
      category: c.category ?? "Creator",
      avatar: c.avatar,
      score:
        normalizeCreatorScore(c.score ?? 0) +
        jitter(seed, i) * 18,
      trend: c.trend,
      trendColor: c.trendColor,
    }))
  );

  /* -----------------------------
     BRANDS
  ------------------------------*/
  feed.push(
    ...brands.map((b, i) => ({
      type: "brand" as const,
      id: b.id,
      name: b.name,
      subtitle: b.description ?? "Brand Opportunity",
      score:
        normalizeBrandScore(b.demandScore ?? 1) +
        jitter(seed, i + 100) * 12,
    }))
  );

  /* -----------------------------
     MATCHES
  ------------------------------*/
  feed.push(
    ...matches.map((m, i) => ({
      type: "match" as const,
      id: m.id ?? `match-${i}`,
      name: m.name ?? "Match",
      subtitle: m.reason ?? "Creator Match",
      score:
        (m.score ?? 0) +
        jitter(seed, i + 200) * 10,
    }))
  );

  return feed.sort((a, b) => b.score - a.score);
}