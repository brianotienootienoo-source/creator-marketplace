const STORAGE_KEY = "creator_price_history";

export type PricePoint = {
  creatorSlug: string;
  price: number;
  timestamp: number;
};

/* -----------------------------
   STORAGE
------------------------------*/

function getAllHistory(): PricePoint[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveHistory(history: PricePoint[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

/* -----------------------------
   RECORD PRICE
------------------------------*/

export function recordPrice(
  creatorSlug: string,
  price: number
) {
  const history = getAllHistory();

  const newPoint: PricePoint = {
    creatorSlug,
    price,
    timestamp: Date.now(),
  };

  history.push(newPoint);

  // 🔥 keep only last 200 points per creator (prevents storage bloat)
  const filtered = history
    .filter((h) => h.creatorSlug === creatorSlug)
    .slice(-200);

  const others = history.filter(
    (h) => h.creatorSlug !== creatorSlug
  );

  saveHistory([...others, ...filtered]);
}

/* -----------------------------
   GET HISTORY
------------------------------*/

export function getCreatorHistory(slug: string) {
  return getAllHistory()
    .filter((h) => h.creatorSlug === slug)
    .sort((a, b) => a.timestamp - b.timestamp);
}