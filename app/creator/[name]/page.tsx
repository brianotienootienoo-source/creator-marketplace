"use client";

import { creators } from "@/app/data/creators";
import { getFollowing, toggleFollowing } from "@/app/lib/following";
import {
  getCreatorPosts,
  addOriginalPost,
  addViralPostFromUrl,
} from "@/app/lib/posts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);

  const creator = creators.find((c) => c.slug === name);

  const [following, setFollowing] = useState<string[]>([]);
  const [posts, setPosts] = useState<any[]>([]);

  // create post state
  const [mode, setMode] = useState<"original" | "viral">("original");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setFollowing(getFollowing());
  }, []);

  useEffect(() => {
    if (creator) {
      setPosts(getCreatorPosts(creator.slug));
    }
  }, [creator]);

  if (!creator) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">Creator not found</h1>
        <Link href="/browse" className="text-blue-600 mt-4 block">
          Back to Browse
        </Link>
      </main>
    );
  }

  const isFollowing = following.includes(creator.name);

  const handleFollow = () => {
    const updated = toggleFollowing(creator.name);
    setFollowing([...updated]);
  };

  const refreshPosts = () => {
    setPosts(getCreatorPosts(creator.slug));
  };

  const handleCreatePost = () => {
    if (mode === "original") {
      addOriginalPost(creator.slug, title, content);
    } else {
      addViralPostFromUrl(creator.slug, url, title);
    }

    setTitle("");
    setContent("");
    setUrl("");

    refreshPosts();
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">

      {/* HEADER */}
      <div className="flex items-center gap-6 mb-10">
        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-gray-200"
        />

        <div>
          <h1 className="text-3xl font-bold">{creator.name}</h1>
          <p className="text-gray-500">{creator.niche}</p>
        </div>
      </div>

      {/* FOLLOW */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleFollow}
          className={`px-5 py-3 rounded-xl transition ${
            isFollowing
              ? "bg-gray-200 text-black"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* CREATE POST */}
      <div className="border rounded-2xl p-5 mb-10">
        <h2 className="font-semibold mb-3">Create Post</h2>

        <div className="flex gap-2 mb-3">
          <button
            onClick={() => setMode("original")}
            className={`px-3 py-1 rounded ${
              mode === "original" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Original
          </button>

          <button
            onClick={() => setMode("viral")}
            className={`px-3 py-1 rounded ${
              mode === "viral" ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Import Viral
          </button>
        </div>

        <input
          className="w-full border p-2 rounded mb-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {mode === "original" ? (
          <textarea
            className="w-full border p-2 rounded mb-2"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <input
            className="w-full border p-2 rounded mb-2"
            placeholder="Paste viral URL (YouTube / TikTok / Instagram)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        )}

        <button
          onClick={handleCreatePost}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>

      {/* POSTS */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Posts</h2>

        <div className="space-y-4">
          {posts.map((post: any) => (
            <div key={post.id} className="border rounded-2xl p-5">

              <div className="text-xs mb-2">
                {post.type === "viral" ? (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
                    Viral • {post.platform}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded">
                    Original
                  </span>
                )}
              </div>

              <h3 className="font-semibold">{post.title}</h3>

              {post.type === "viral" ? (
                <a
                  href={post.url}
                  target="_blank"
                  className="text-blue-600 text-sm"
                >
                  View external post →
                </a>
              ) : (
                <p className="text-gray-600">{post.content}</p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                ❤️ {post.likes}
              </p>

            </div>
          ))}
        </div>
      </div>

    </main>
  );
}