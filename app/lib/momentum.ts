export function getMomentumScore(creatorId: string) {
  // mock “platform activity signal”
  // later this becomes real analytics

  const seed = creatorId
    .split("")
    .reduce((acc, c) => acc + c.charCodeAt(0), 0);

  const wave = Math.sin(seed) * 10; // -10 to +10
  const randomBoost = (seed % 7); // small deterministic variation

  return Math.max(0, wave + randomBoost);
}