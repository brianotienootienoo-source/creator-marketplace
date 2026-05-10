const creatorAffinityMap = new Map<string, number>();

export function boostCreatorAffinity(
  creatorId: string,
  amount = 1
) {
  const current =
    creatorAffinityMap.get(creatorId) ?? 0;

  creatorAffinityMap.set(
    creatorId,
    current + amount
  );
}

export function getCreatorAffinity(
  creatorId: string
) {
  return creatorAffinityMap.get(creatorId) ?? 0;
}

export function decayCreatorAffinity() {
  for (const [
    creatorId,
    value,
  ] of creatorAffinityMap.entries()) {
    creatorAffinityMap.set(
      creatorId,
      Math.max(0, value - 0.05)
    );
  }
}

export function getTopAffinityCreators(
  limit = 5
) {
  return [...creatorAffinityMap.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit);
}