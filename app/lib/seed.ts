import { addOriginalPost, addViralPostFromUrl } from "./posts";

export function seedTestData() {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem("creator_posts");
  if (existing && JSON.parse(existing).length > 0) return;

  // 🧪 Original posts
  addOriginalPost(
    "alex",
    "Why AI will change everything",
    "We are entering a new era of intelligence..."
  );

  addOriginalPost(
    "maria",
    "Building in public is underrated",
    "Sharing progress attracts opportunity..."
  );

  // 🔥 Viral posts
  addViralPostFromUrl(
    "alex",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "This changed how I think about growth"
  );

  addViralPostFromUrl(
    "john",
    "https://www.tiktok.com/@test/video/123",
    "This blew up overnight"
  );
}