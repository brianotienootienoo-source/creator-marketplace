import { creators } from "@/app/data/creators";
import { getBrandOpportunities } from "@/app/lib/feed";

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
    };

function scoreCreator(c: any) {
  return c.followers * 0.0001 + Math.random() * 20;
}

function scoreBrand(b: any) {
  return b.demand + Math.random() * 10;
}

export function buildMarketFeed(): FeedItem[] {
  const creatorItems: FeedItem[] = creators.map((c) => ({
    type: "creator",
    id: c.slug,
    title: c.name,
    subtitle: c.category,
    image: c.avatar,
    score: scoreCreator(c),
  }));

  const brandItems: FeedItem[] = getBrandOpportunities().map((b) => ({
    type: "brand",
    id: b.name,
    title: b.name,
    subtitle: b.desc,
    score: scoreBrand(b),
  }));

  return [...creatorItems, ...brandItems].sort(
    (a, b) => b.score - a.score
  );
}