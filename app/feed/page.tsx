"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { creators } from "@/app/data/creators";
import { likePost, addComment } from "@/app/lib/posts";
import { subscribeToFeedUpdates } from "@/app/lib/feedChannel";
import { getGlobalFeed } from "@/app/lib/feedEngine";
import { seedTestData } from "@/app/lib/seed";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  /* LOAD FEED */
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

    window.addEventListener("focus", loadPosts);
    return () => window.removeEventListener("focus", loadPosts);
  }, []);

  const getCreator = (slug: string) =>
    creators.find((c) => c.slug === slug);

  const handleLike = (postId: string) => {
    likePost(postId);
    loadPosts();
  };

  const handleComment = (postId: string) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    addComment(postId, "You", text);

    setCommentText((prev) => ({
      ...prev,
      [postId]: "",
    }));

    loadPosts();
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-6">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">Feed</h1>
        <p className="text-sm text-gray-500">
          Creator–Brand intelligence
        </p>
      </div>

      {/* FEED */}
      <div className="space-y-6">

        {posts.map((post) => {
          const creator = getCreator(post.creatorSlug);
          if (!creator) return null;

          return (
            <div
              key={post.id}
              className="ui-card p-5 fade-in"
            >

              {/* CREATOR */}
              <Link
                href={`/creator/${creator.slug}`}
                className="flex items-center gap-3 mb-3"
              >
                <img
                  src={creator.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-sm">
                    {creator.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    @{creator.slug}
                  </p>
                </div>
              </Link>

              {/* CONTENT */}
              <h3 className="font-semibold mb-2">
                {post.title}
              </h3>

              {post.type === "original" && (
                <p className="text-gray-600 text-sm">
                  {post.content}
                </p>
              )}

              {post.type === "viral" && post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  className="text-blue-500 text-sm"
                >
                  View content →
                </a>
              )}

              {/* ACTIONS */}
              <div className="flex items-center gap-6 mt-4 text-sm">

                <button
                  onClick={() => handleLike(post.id)}
                  className="btn-like"
                >
                  ❤️ {post.likes || 0}
                </button>

                <span className="text-gray-500">
                  💬 {post.comments?.length || 0}
                </span>

              </div>

              {/* COMMENTS */}
              <div className="mt-4 space-y-2">

                {(post.comments || []).map((c: any) => (
                  <div key={c.id} className="text-sm text-gray-600">
                    <span className="font-semibold">{c.user}</span>{" "}
                    {c.text}
                  </div>
                ))}

                <div className="flex gap-2 mt-2">
                  <input
                    className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    placeholder="Reply..."
                    value={commentText[post.id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                  />

                  <button
                    onClick={() => handleComment(post.id)}
                    className="btn-primary"
                  >
                    Post
                  </button>
                </div>

              </div>

            </div>
          );
        })}

      </div>
    </main>
  );
}