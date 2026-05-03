import { creators } from "@/app/data/creators";
import { getBrandOpportunities } from "@/app/lib/feed";
import { buildMatches } from "@/app/lib/matchEngine";

/* -----------------------------
   TYPES
------------------------------*/
type FeedItem =
  | {
      type: "creator";
      id: string;
      title: string;
      subtitle: string;
      image: string;
      score: number;
    }
  | {
      type: "brand";
      id: string;
      title: string;
      subtitle: string;
      score: number;
    }
  | {
      type: "match";
      id: string;
      title: string;
      subtitle: string;
      score: number;
    };

/* -----------------------------
   NORMALISE ID HELPER
------------------------------*/
function normalizeId(value: string) {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .trim();
}

/* -----------------------------
   FEED V2 ENGINE (FIXED)
------------------------------*/
export function buildFeedV2(): FeedItem[] {
  const brands = getBrandOpportunities();
  const matches = buildMatches();

  const feed: FeedItem[] = [];

  // 1. CREATOR NODES
  for (const c of creators) {
    feed.push({
      type: "creator",
      id: c.slug,
      title: c.name,
      subtitle: `${c.category} • ${c.followers.toLocaleString()} followers`,
      image: c.avatar,
      score: (c.followers || 0) / 1000,
    });
  }

  // 2. BRAND NODES (🔴 FIXED IDS HERE)
  for (const b of brands) {
    feed.push({
      type: "brand",
      id: normalizeId(b.name),   // 🔥 CRITICAL FIX
      title: b.name,
      subtitle: b.desc,
      score: b.demand || 0,
    });
  }

  // 3. MATCH NODES
  for (const m of matches) {
    feed.push({
      type: "match",
      id: m.creator.slug + "-" + normalizeId(m.brand.name),
      title: `${m.creator.name} × ${m.brand.name}`,
      subtitle: m.reason,
      score: m.score + 20,
    });
  }

  // 4. FINAL SORT
  return feed.sort((a, b) => b.score - a.score).slice(0, 40);
}