const exposureMap = new Map<string, number>();

/**
 * Tracks how recently a creator was shown
 */
export function markSeen(id: string) {
  exposureMap.set(id, Date.now());
}

/**
 * Returns how "recent" something is
 */
export function getExposureAge(id: string) {
  const lastSeen = exposureMap.get(id);
  if (!lastSeen) return Infinity;

  return Date.now() - lastSeen;
}

/**
 * Cooldown penalty (prevents spam appearance)
 */
export function getCooldownPenalty(id: string) {
  const age = getExposureAge(id);

  // 0–1 penalty (recent = strong penalty)
  return Math.max(0, 1 - age / 60000);
}