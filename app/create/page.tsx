"use client";

import { useState } from "react";
import {
  addOriginalPost,
  addViralPostFromUrl,
} from "@/app/lib/posts";
import { creators } from "@/app/data/creators";
import Link from "next/link";

export default function CreatePostPage() {
  const [creatorSlug, setCreatorSlug] = useState("");
  const [type, setType] = useState<"original" | "viral">("original");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerFeedRefresh = () => {
    // forces feed page to re-run loadPosts
    window.dispatchEvent(new Event("focus"));
  };

  const handleSubmit = () => {
    if (loading) return;

    if (!creatorSlug) {
      setStatus("Select a creator first");
      return;
    }

    setLoading(true);

    try {
      if (type === "original") {
        if (!title || !content) {
          setStatus("Title and content required");
          setLoading(false);
          return;
        }

        addOriginalPost(creatorSlug, title, content);
      }

      if (type === "viral") {
        if (!url) {
          setStatus("URL required");
          setLoading(false);
          return;
        }

        addViralPostFromUrl(creatorSlug, url, title);
      }

      // ✅ IMPORTANT: instant feed refresh
      triggerFeedRefresh();

      setStatus("Post published and pushed to feed 🚀");

      setTitle("");
      setContent("");
      setUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-2">
        Create Post
      </h1>

      <p className="text-gray-500 mb-6">
        Add original or viral content to the feed
      </p>

      {/* CREATOR SELECT */}
      <div className="mb-4">
        <label className="text-sm font-semibold">Creator</label>

        <select
          value={creatorSlug}
          onChange={(e) => setCreatorSlug(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
        >
          <option value="">Select creator</option>
          {creators.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* TYPE */}
      <div className="mb-4">
        <label className="text-sm font-semibold">Post Type</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value as any)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
        >
          <option value="original">Original</option>
          <option value="viral">Viral (URL Import)</option>
        </select>
      </div>

      {/* TITLE */}
      <div className="mb-4">
        <label className="text-sm font-semibold">Title</label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-xl px-3 py-2 mt-1"
          placeholder="Enter post title"
        />
      </div>

      {/* ORIGINAL CONTENT */}
      {type === "original" && (
        <div className="mb-4">
          <label className="text-sm font-semibold">Content</label>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 mt-1 h-32"
            placeholder="Write your post..."
          />
        </div>
      )}

      {/* VIRAL URL */}
      {type === "viral" && (
        <div className="mb-4">
          <label className="text-sm font-semibold">
            URL (YouTube, TikTok, Instagram)
          </label>

          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full border rounded-xl px-3 py-2 mt-1"
            placeholder="Paste video/post URL"
          />
        </div>
      )}

      {/* ACTION BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl mt-4 disabled:opacity-50"
      >
        {loading ? "Publishing..." : "Publish Post"}
      </button>

      {/* STATUS */}
      {status && (
        <p className="text-center text-sm mt-4 text-gray-500">
          {status}
        </p>
      )}

      {/* BACK LINK */}
      <div className="text-center mt-6">
        <Link href="/feed" className="text-sm text-blue-500 hover:underline">
          ← Back to Feed
        </Link>
      </div>

    </main>
  );
}