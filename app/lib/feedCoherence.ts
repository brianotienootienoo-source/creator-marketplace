type FeedItem = {
  id: string;
  type: "creator" | "brand" | "match";
  category?: string;
  score: number;
};

type CoherentFeedSection = {
  lane: string;
  items: FeedItem[];
  strength: number;
};

/* -----------------------------
   LANE DETECTION
------------------------------*/
function detectLane(item: FeedItem): string {
  if (item.type === "brand") return "growth";
  if (item.type === "match") return "opportunity";

  const cat = (item.category || "").toLowerCase();

  if (cat.includes("tech")) return "tech";
  if (cat.includes("fitness")) return "fitness";
  if (cat.includes("fashion")) return "fashion";
  if (cat.includes("gaming")) return "gaming";

  return "general";
}

/* -----------------------------
   GROUP INTO LANES
------------------------------*/
export function buildCoherentFeed(
  items: FeedItem[]
): CoherentFeedSection[] {
  const lanes: Record<string, FeedItem[]> = {};

  for (const item of items) {
    const lane = detectLane(item);

    if (!lanes[lane]) lanes[lane] = [];

    lanes[lane].push(item);
  }

  /* -----------------------------
     SORT EACH LANE INTERNALLY
  ------------------------------*/
  const result: CoherentFeedSection[] = [];

  for (const lane in lanes) {
    const sorted = lanes[lane].sort(
      (a, b) => b.score - a.score
    );

    result.push({
      lane,
      items: sorted,
      strength: calculateLaneStrength(sorted),
    });
  }

  /* -----------------------------
     ORDER LANES BY IMPORTANCE
  ------------------------------*/
  return result.sort(
    (a, b) => b.strength - a.strength
  );
}

/* -----------------------------
   LANE STRENGTH
------------------------------*/
function calculateLaneStrength(items: FeedItem[]) {
  const avg =
    items.reduce((sum, i) => sum + i.score, 0) /
    items.length;

  const density = items.length;

  return avg * 0.7 + density * 3;
}