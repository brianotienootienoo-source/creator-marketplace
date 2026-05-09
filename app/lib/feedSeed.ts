export function getFeedSeed(inputId?: string) {
  const now = new Date();

  // 🧠 stable daily seed (changes every day)
  const daySeed = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;

  // optional user/session input
  const base = inputId ? `${daySeed}-${inputId}` : daySeed;

  return hashString(base);
}

// simple deterministic hash (no dependencies)
function hashString(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return Math.abs(hash);
}