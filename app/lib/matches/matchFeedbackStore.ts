type MatchRecord = {
  key: string;
  score: number;
  lastUpdated: number;
};

const store = new Map<string, MatchRecord>();

/* -----------------------------
   INITIALIZE / UPDATE FEEDBACK
   - called when user interacts with a match
------------------------------*/
export function recordMatchFeedback(
  key: string,
  delta: number
) {
  const existing = store.get(key);

  if (!existing) {
    store.set(key, {
      key,
      score: delta,
      lastUpdated: Date.now(),
    });
    return;
  }

  existing.score = clamp(existing.score + delta, -1, 1);
  existing.lastUpdated = Date.now();

  store.set(key, existing);
}

/* -----------------------------
   READ MATCH QUALITY
   - used in scoring engine
------------------------------*/
export function getMatchQuality(key: string): number {
  const record = store.get(key);

  if (!record) return 0;

  // slight decay over time so stale feedback fades
  const age = Date.now() - record.lastUpdated;

  const decay =
    age > 1000 * 60 * 60 * 24 ? 0.5 : // 24h
    age > 1000 * 60 * 60 ? 0.2 : 0;   // 1h

  return record.score * (1 - decay);
}

/* -----------------------------
   SAFETY UTIL
------------------------------*/
function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}