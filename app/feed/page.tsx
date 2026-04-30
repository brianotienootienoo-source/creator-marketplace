"use client";

import { useEffect, useState } from "react";
import { creators } from "@/app/data/creators";

import { likePost, addComment } from "@/app/lib/posts";
import { subscribeToFeedUpdates } from "@/app/lib/feedChannel";
import { getGlobalFeed } from "@/app/lib/feedEngine";
import { seedTestData } from "@/app/lib/seed";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const loadPosts = () => {
    const feed = getGlobalFeed();
    setPosts(feed);
  };

  useEffect(() => {
    const seeded = localStorage.getItem("seeded");

    if (!seeded) {
      seedTestData();
      localStorage.setItem("seeded", "true");
    }

    loadPosts();
    subscribeToFeedUpdates(loadPosts);
  }, []);

  const getCreator = (slug: string) =>
    creators.find((c) => c.slug === slug);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({ ...prev, [postId]: true }));
    likePost(postId);
  };

  const handleComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    addComment(postId, "You", text);

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));
  };

  const getTrendIcon = (v: string) => {
    if (v === "exploding") return "🚀";
    if (v === "viral") return "📈";
    if (v === "warming") return "🔥";
    if (v === "cold") return "🧊";
    return "➖";
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">

      <div className="mb-6">
        <h1 className="text-xl font-bold">Home</h1>
        <p className="text-xs text-gray-500">
          Creator–Brand intelligence feed
        </p>
      </div>

      <div className="space-y-5">

        {posts.map((post) => {
          const creator = getCreator(post.creatorSlug);
          if (!creator) return null;

          return (
            <div
              key={post.id}
              className="ui-card p-4 fade-in"
            >

              {/* CREATOR */}
              <Link
                href={`/creator/${creator.slug}`}
                className="flex items-start gap-3"
              >
                <img
                  src={creator.avatar}
                  className="w-9 h-9 rounded-full object-cover"
                />

                <div className="flex-1">

                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">
                      {creator.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      @{creator.slug}
                    </p>

                    <span className="text-xs px-2 py-[2px] bg-gray-100 rounded-full">
                      {post.ui?.virality}
                    </span>
                  </div>

                  <div className="flex gap-3 text-[11px] text-gray-500 mt-1">
                    <span>
                      {getTrendIcon(post.ui?.virality)} {post.ui?.virality}
                    </span>

                    <span>
                      ❤️ {Math.round(post.ui?.engagement || 0)}
                    </span>

                    <span>
                      score {post.ui?.feedScore ?? 0}
                    </span>
                  </div>

                </div>
              </Link>

              {/* CONTENT */}
              <div className="ml-12 mt-3">

                <h3 className="text-sm font-semibold mb-1">
                  {post.title}
                </h3>

                {post.type === "original" && (
                  <p className="text-sm text-gray-700">
                    {post.content}
                  </p>
                )}

                {post.type === "viral" && post.url && (
                  <a
                    href={post.url}
                    target="_blank"
                    className="text-xs text-blue-500 hover:underline"
                  >
                    View external content →
                  </a>
                )}

                {/* ACTIONS */}
                <div className="flex items-center gap-5 mt-4 text-xs text-gray-500">

                  <button
                    onClick={() => handleLike(post.id)}
                    className="btn-like"
                  >
                    ❤️ {post.likes || 0}
                  </button>

                  <span>
                    💬 {post.comments?.length || 0}
                  </span>

                </div>

              </div>

            </div>
          );
        })}

      </div>
    </main>
  );
}