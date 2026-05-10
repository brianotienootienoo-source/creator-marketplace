export function generateTrendStream(creators: any[]) {
  return [...creators]
    .sort((a, b) => (b.momentum ?? 0) - (a.momentum ?? 0))
    .slice(0, 40);
}

export function generateEngagementStream(creators: any[]) {
  return [...creators]
    .sort((a, b) => (b.engagementScore ?? 0) - (a.engagementScore ?? 0))
    .slice(0, 40);
}

export function generateDiscoveryStream(creators: any[], seed: number) {
  return [...creators]
    .sort(() => Math.random() - 0.5)
    .slice(0, 40);
}

export function generateStabilityStream(creators: any[]) {
  return [...creators]
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 40);
}

export function generateMemoryStream(creators: any[]) {
  return [...creators]
    .sort((a, b) => (b.memoryScore ?? 0) - (a.memoryScore ?? 0))
    .slice(0, 40);
}