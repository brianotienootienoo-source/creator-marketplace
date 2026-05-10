const nicheAffinityMap = new Map<string, number>();

export function boostNicheAffinity(
  niche: string,
  amount = 1
) {
  const current =
    nicheAffinityMap.get(niche) ?? 0;

  nicheAffinityMap.set(
    niche,
    current + amount
  );
}

export function getNicheAffinity(
  niche: string
) {
  return nicheAffinityMap.get(niche) ?? 0;
}

export function decayNicheAffinity() {
  for (const [
    niche,
    value,
  ] of nicheAffinityMap.entries()) {
    nicheAffinityMap.set(
      niche,
      Math.max(0, value - 0.03)
    );
  }
}

export function getTopAffinityNiches(
  limit = 5
) {
  return [...nicheAffinityMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}