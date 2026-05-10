type FeedItem = {
  type: "creator" | "brand" | "match";
  id: string;
  score: number;
};

/* -----------------------------
   BALANCE CONFIG
------------------------------*/
const MAX_PER_TYPE = {
  creator: 18,
  brand: 10,
  match: 8,
};

/* -----------------------------
   BALANCER
------------------------------*/
export function balanceRecommendations(
  feed: FeedItem[]
) {
  const counts = {
    creator: 0,
    brand: 0,
    match: 0,
  };

  const balanced: FeedItem[] = [];

  for (const item of feed) {
    const limit =
      MAX_PER_TYPE[item.type];

    if (
      counts[item.type] < limit
    ) {
      balanced.push(item);
      counts[item.type]++;
    }
  }

  return balanced;
}