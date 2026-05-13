import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { buildMatches } from "@/app/lib/matchEngine";

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
   SEED
------------------------------*/
function getSeed() {
  return Date.now() + Math.floor(Math.random() * 10000);
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

function normalizeBrandScore(demand: number) {
  return Math.log10((demand ?? 1) + 1) * 50;
}

/* -----------------------------
   MAIN FEED
------------------------------*/
export function buildFeedV2(): FeedItem[] {
  const seed = getSeed();

  const creators = getCreatorUniverse();
  const brands = getBrandUniverse();
  const matches = buildMatches();

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
     BRANDS (NOW FROM UNIVERSE)
  ------------------------------*/
  feed.push(
    ...brands.map((b, i) => ({
      type: "brand" as const,
      id: b.id,
      name: b.name,
      subtitle: b.description,
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
      id: m?.id ?? `match-${i}`,
      name: m?.name ?? "Match",
      subtitle: m?.reason ?? "match",
      score: (m?.score ?? 0) + jitter(seed, i + 200) * 10,
    }))
  );

  return feed.sort((a, b) => b.score - a.score);
}