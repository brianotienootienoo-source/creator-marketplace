type CacheEntry = {
  data: any;
  timestamp: number;
};

const cache: Record<string, CacheEntry> = {};

const TTL = 1000 * 60 * 5; // 5 minutes

export function getCachedFeed(key: string) {
  const entry = cache[key];

  if (!entry) return null;

  const expired = Date.now() - entry.timestamp > TTL;

  if (expired) {
    delete cache[key];
    return null;
  }

  return entry.data;
}

export function setCachedFeed(key: string, data: any) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}