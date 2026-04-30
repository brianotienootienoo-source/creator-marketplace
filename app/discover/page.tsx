"use client";

import { useEffect, useState } from "react";
import { creators } from "@/app/data/creators";
import {
  getPosts,
  calculateCreatorScore,
} from "@/app/lib/posts";
import Link from "next/link";

export default function DiscoverPage() {
  const [topCreators, setTopCreators] = useState<any[]>([]);
  const [viralPosts, setViralPosts] = useState<any[]>([]);

  useEffect(() => {
    const allPosts = getPosts();

    /**
     * 🏆 TOP CREATORS (Brand leaderboard)
     */
    const rankedCreators = creators
      .map((c) => {
        const score = calculateCreatorScore(c.slug);

        const creatorPosts = allPosts.filter(
          (p) => p.creatorSlug === c.slug
        );

        const viralCount = creatorPosts.filter(
          (p) => p.type === "viral"
        ).length;

        const totalLikes = creatorPosts.reduce(
          (sum, p) => sum + (p.likes || 0),
          0
        );

        return {
          ...c,
          score,
          viralCount,
          totalLikes,
        };
      })
      .sort((a, b) => b.score - a.score);

    setTopCreators(rankedCreators);

    /**
     * 🔥 VIRAL IMPACT FEED
     * (posts boosted by likes + creator score)
     */
    const viral = allPosts
      .filter((p) => p.type === "viral")
      .map((p) => {
        const creatorScore = calculateCreatorScore(
          p.creatorSlug
        );

        const viralWeight =
          (p.likes || 0) * 0.7 + creatorScore * 0.3;

        return {
          ...p,
          viralWeight,
        };
      })
      .sort((a, b) => b.viralWeight - a.viralWeight);

    setViralPosts(viral);
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Brand Discovery
      </h1>

      <p className="text-gray-500 mb-10">
        Discover top creators and viral content ranked by performance signals
      </p>

      {/* 🏆 TOP CREATORS */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">
          Top Creators
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topCreators.map((c) => (
            <Link
              key={c.slug}
              href={`/creator/${c.slug}`}
              className="border rounded-2xl p-4 hover:shadow-md transition"
            >
              <img
                src={c.avatar}
                className="w-14 h-14 rounded-full object-cover mb-2"
              />

              <p className="font-semibold">{c.name}</p>

              <p className="text-xs text-gray-500">
                Score: {c.score}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                🔥 {c.viralCount} viral posts
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 VIRAL IMPACT FEED */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Viral Impact Feed
        </h2>

        <div className="space-y-5">
          {viralPosts.map((post) => {
            const creator = creators.find(
              (c) => c.slug === post.creatorSlug
            );

            if (!creator) return null;

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
                    className="w-10 h-10 rounded-full"
                  />

                  <div>
                    <p className="font-semibold">
                      {creator.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      @{creator.slug}
                    </p>
                  </div>
                </Link>

                {/* TITLE */}
                <h3 className="font-semibold text-lg">
                  {post.title}
                </h3>

                {/* STATS */}
                <div className="text-xs text-gray-500 mt-2">
                  ❤️ {post.likes?.toLocaleString()} likes •
                  ⚡ Viral weight:{" "}
                  {Math.round(post.viralWeight)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}