const KEY = "following_creators";

export function getFollowing(): string[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem(KEY) || "[]");
}

export function toggleFollowing(name: string): string[] {
  const current = getFollowing();

  const updated = current.includes(name)
    ? current.filter((n) => n !== name)
    : [...current, name];

  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function isFollowing(name: string): boolean {
  return getFollowing().includes(name);
}