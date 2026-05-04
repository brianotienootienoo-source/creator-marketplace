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
   FEED V2 ENGINE (FINAL STABLE VERSION)
------------------------------*/
export function buildFeedV2(): FeedItem[] {
  const brands = getBrandOpportunities();
  const matches = buildMatches();

  const feed: FeedItem[] = [];

  /* -----------------------------
     1. CREATOR NODES
  ------------------------------*/
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

  /* -----------------------------
     2. BRAND NODES (SOURCE OF TRUTH FIX)
     IMPORTANT: DO NOT TRANSFORM IDS
  ------------------------------*/
  for (const b of brands) {
    feed.push({
      type: "brand",
      id: b.id, // 🔥 CRITICAL FIX: use raw stable ID only
      title: b.name,
      subtitle: b.desc,
      score: b.demand || 0,
    });
  }

  /* -----------------------------
     3. MATCH NODES
  ------------------------------*/
  for (const m of matches) {
    feed.push({
      type: "match",
      id: `${m.creator.slug}-${m.brand.id}`,
      title: `${m.creator.name} × ${m.brand.name}`,
      subtitle: m.reason,
      score: m.score + 20,
    });
  }

  /* -----------------------------
     4. SORT + LIMIT
  ------------------------------*/
  return feed
    .sort((a, b) => b.score - a.score)
    .slice(0, 40);
}