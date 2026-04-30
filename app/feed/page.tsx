"use client";

import { useEffect, useState } from "react";
import { creators } from "@/app/data/creators";
import {
  getPosts,
  likePost,
  addComment,
  calculateCreatorScore,
  getCreatorTier,        // ✅ NEW
  getCreatorPrice,       // ✅ NEW
  getCreatorTrend,       // ✅ NEW
} from "@/app/lib/posts";
import { subscribeToFeedUpdates } from "@/app/lib/feedChannel";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [commentText, setCommentText] = useState<Record<string, string>>({});
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const loadPosts = () => {
    const allPosts = getPosts();

    const sorted = [...allPosts]
      .map((post) => {
        const creatorScore = calculateCreatorScore(post.creatorSlug);
        return { ...post, creatorScore };
      })
      .sort((a, b) => {
        const timeDiff = b.createdAt - a.createdAt;
        const scoreDiff = (b.creatorScore || 0) - (a.creatorScore || 0);
        return timeDiff * 0.85 + scoreDiff * 0.15;
      });

    setPosts(sorted);
  };

  useEffect(() => {
    loadPosts();

    subscribeToFeedUpdates(() => {
      loadPosts();
    });

    window.addEventListener("focus", loadPosts);

    return () => {
      window.removeEventListener("focus", loadPosts);
    };
  }, []);

  const getCreator = (slug: string) =>
    creators.find((c) => c.slug === slug);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => ({
      ...prev,
      [postId]: true,
    }));

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

  const handleCommentKey = (e: any, postId: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleComment(postId);
    }
  };

  const renderEmbed = (post: any) => {
    if (post.type !== "viral") return null;

    const url = post.url || "";

    if (post.platform === "youtube") {
      const videoId =
        url.includes("v=")
          ? url.split("v=")[1]?.split("&")[0]
          : url.split("/").pop();

      return (
        <iframe
          className="w-full h-60 rounded-xl mt-3"
          src={`https://www.youtube.com/embed/${videoId}`}
          allowFullScreen
        />
      );
    }

    if (post.platform === "tiktok") {
      return (
        <div className="mt-3 p-4 bg-black text-white rounded-xl">
          🎵 TikTok post
          <a
            href={url}
            target="_blank"
            className="block text-sm text-blue-300 mt-2"
          >
            Open TikTok →
          </a>
        </div>
      );
    }

    if (post.platform === "instagram") {
      return (
        <div className="mt-3 p-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl">
          📸 Instagram post
          <a
            href={url}
            target="_blank"
            className="block text-sm mt-2 underline"
          >
            View on Instagram →
          </a>
        </div>
      );
    }

    return null;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "rising") return "📈";
    if (trend === "declining") return "📉";
    return "➖";
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Global Feed
      </h1>

      <p className="text-gray-500 mb-6">
        Latest posts from creators across the platform
      </p>

      {/* STORY STRIP */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {creators.map((c) => (
          <Link
            key={c.slug}
            href={`/creator/${c.slug}`}
            className="flex flex-col items-center min-w-[70px]"
          >
            <img
              src={c.avatar}
              className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 hover:ring-black transition"
            />
            <p className="text-xs mt-1 text-center truncate w-full">
              {c.name.split(" ")[0]}
            </p>
          </Link>
        ))}
      </div>

      {/* FEED */}
      <div className="space-y-5">
        {posts.map((post) => {
          const creator = getCreator(post.creatorSlug);
          if (!creator) return null;

          const tier = getCreatorTier(post.creatorSlug);
          const price = getCreatorPrice(post.creatorSlug);
          const trend = getCreatorTrend(post.creatorSlug);

          return (
            <div
              key={post.id}
              className="border rounded-2xl p-5 hover:shadow-md transition"
            >

              {/* CREATOR */}
              <Link
                href={`/creator/${creator.slug}`}
                className="flex items-center gap-3 mb-3"
              >
                <img
                  src={creator.avatar}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={creator.name}
                />

                <div>
                  <p className="font-semibold hover:underline">
                    {creator.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    @{creator.slug}
                  </p>

                  {/* 🔥 C15-B: Creator Intelligence */}
                  <div className="flex items-center gap-2 mt-1 text-[11px]">

                    <span className="px-2 py-[2px] bg-black text-white rounded-full">
                      {tier}
                    </span>

                    <span className="text-gray-600">
                      💰 {price.toLocaleString()}
                    </span>

                    <span className="text-gray-500">
                      {getTrendIcon(trend)} {trend}
                    </span>

                  </div>

                  {/* optional: keep score but subtle */}
                  <p className="text-[10px] text-gray-300">
                    score {post.creatorScore || 0}
                  </p>
                </div>
              </Link>

              {/* BADGE */}
              <div className="text-xs mb-3">
                {post.type === "viral" ? (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                    Viral • {post.platform}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    Original
                  </span>
                )}
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-lg mb-2">
                {post.title}
              </h3>

              {/* CONTENT */}
              {post.type === "original" && (
                <p className="text-gray-600">
                  {post.content}
                </p>
              )}

              {/* VIRAL */}
              {post.type === "viral" && renderEmbed(post)}

              {/* ACTION BAR */}
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">

                <button
                  onClick={() => handleLike(post.id)}
                  className={`transition ${
                    likedPosts[post.id]
                      ? "text-red-500"
                      : "hover:text-red-500"
                  }`}
                >
                  ❤️ {Number(post.likes || 0).toLocaleString()}
                </button>

                <span className="text-xs text-gray-400">
                  {post.comments?.length || 0} comments
                </span>

              </div>

              {/* COMMENTS */}
              <div className="mt-4 space-y-3">

                {(post.comments || []).map((c: any) => (
                  <div key={c.id} className="flex gap-3">

                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                      {c.user?.[0] || "U"}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {c.user}
                      </p>
                      <p className="text-sm text-gray-600">
                        {c.text}
                      </p>
                    </div>

                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <input
                    className="flex-1 border rounded-xl px-3 py-2 text-sm"
                    placeholder="Write a comment..."
                    value={commentText[post.id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({
                        ...prev,
                        [post.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) =>
                      handleCommentKey(e, post.id)
                    }
                  />

                  <button
                    onClick={() => handleComment(post.id)}
                    className="px-4 py-2 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition"
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