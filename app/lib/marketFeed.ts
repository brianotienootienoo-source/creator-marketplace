import { creators as legacyCreators } from "@/app/data/creators";
import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";
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
  return (
    (c.stats?.followers ?? 0) * 0.0001 +
    (c.stats?.engagementRate ?? 0) * 20 +
    Math.random() * 10
  );
}

function scoreBrand(b: any) {
  return (b.demand ?? 0) + Math.random() * 10;
}

export function buildMarketFeed(): FeedItem[] {
  const creators = adaptLegacyCreators(legacyCreators);

  const creatorItems: FeedItem[] = creators.map((c) => ({
    type: "creator",
    id: c.slug || c.id,
    title: c.displayName,
    subtitle: c.niche,
    image: c.avatar,
    score: scoreCreator(c),
  }));

  const brandItems: FeedItem[] = getBrandOpportunities().map((b) => ({
    type: "brand",
    id: b.id,
    title: b.name,
    subtitle: b.desc,
    score: scoreBrand(b),
  }));

  return [...creatorItems, ...brandItems].sort(
    (a, b) => b.score - a.score
  );
}