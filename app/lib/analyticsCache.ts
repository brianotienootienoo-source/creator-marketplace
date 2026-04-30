type CacheEntry<T> = {
  value: T;
  timestamp: number;
};

const CACHE_TTL = 1000 * 60 * 5; // 5 minutes

const cache: Record<string, CacheEntry<any>> = {};

/* =========================================================
   🧠 CACHE CORE
=========================================================*/

export function setCache<T>(key: string, value: T) {
  cache[key] = {
    value,
    timestamp: Date.now(),
  };
}

export function getCache<T>(key: string): T | null {
  const entry = cache[key];

  if (!entry) return null;

  const isExpired = Date.now() - entry.timestamp > CACHE_TTL;

  if (isExpired) {
    delete cache[key];
    return null;
  }

  return entry.value;
}

export function clearCache() {
  Object.keys(cache).forEach((key) => delete cache[key]);
}

/* =========================================================
   ⚡ SAFE WRAPPER (IMPORTANT)
=========================================================*/

/**
 * Wrap expensive computations safely with caching
 */
export function cached<T>(
  key: string,
  compute: () => T
): T {
  const existing = getCache<T>(key);

  if (existing !== null) {
    return existing;
  }

  const result = compute();
  setCache(key, result);

  return result;
}