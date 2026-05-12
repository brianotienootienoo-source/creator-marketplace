/**
 * 🖼️ Creator Banner Generator (Deterministic Fallback System)
 * Ensures NO creator ever renders with a blank/grey banner.
 */

const fallbackBanners = [
  "https://images.unsplash.com/photo-1503264116251-35a269479413",
  "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  "https://images.unsplash.com/photo-1526481280695-3c687fd643ed",
  "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
];

/**
 * Stable hash → ensures same creator always gets same banner
 */
function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/**
 * Main function used everywhere in UI
 */
export function getCreatorBanner(id: string): string {
  const index = hashString(id) % fallbackBanners.length;
  return fallbackBanners[index];
}