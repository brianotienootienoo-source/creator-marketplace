"use client";

import { useEffect, useState } from "react";
import { creators } from "@/app/data/creators";
import { getPosts, calculateCreatorScore } from "@/app/lib/posts";
import Link from "next/link";

export default function BrandMatchPage() {
  const [results, setResults] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    runSearch();
  }, []);

  const runSearch = () => {
    const allPosts = getPosts();

    const enriched = creators.map((c) => {
      const score = calculateCreatorScore(c.slug);

      const posts = allPosts.filter(
        (p) => p.creatorSlug === c.slug
      );

      const viralCount = posts.filter(
        (p) => p.type === "viral"
      ).length;

      const totalLikes = posts.reduce(
        (sum, p) => sum + (p.likes || 0),
        0
      );

      return {
        ...c,
        score,
        viralCount,
        totalLikes,
      };
    });

    setResults(enriched);
  };

  const filtered = results
    .filter((c) => {
      const q = query.toLowerCase();

      if (!q) return true;

      return (
        c.name.toLowerCase().includes(q) ||
        c.slug.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      // 🔥 Brand logic ranking:
      // score first, then viral activity, then engagement
      return (
        b.score +
        b.viralCount * 50 +
        b.totalLikes * 0.001 -
        (a.score + a.viralCount * 50 + a.totalLikes * 0.001)
      );
    });

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Brand Campaign Matchmaking
      </h1>

      <p className="text-gray-500 mb-6">
        Find creators based on performance, virality, and engagement strength
      </p>

      {/* SEARCH */}
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search creators (e.g. fitness, tech, name...)"
        className="w-full border rounded-xl px-4 py-3 mb-8"
      />

      {/* RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/creator/${c.slug}`}
            className="border rounded-2xl p-5 hover:shadow-md transition"
          >

            {/* CREATOR HEADER */}
            <div className="flex items-center gap-3 mb-3">
              <img
                src={c.avatar}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-gray-500">
                  @{c.slug}
                </p>
              </div>
            </div>

            {/* METRICS */}
            <div className="text-sm text-gray-600 space-y-1">

              <p>
                🏆 Score:{" "}
                <span className="font-semibold">
                  {c.score}
                </span>
              </p>

              <p>
                🔥 Viral posts:{" "}
                <span className="font-semibold">
                  {c.viralCount}
                </span>
              </p>

              <p>
                ❤️ Total likes:{" "}
                <span className="font-semibold">
                  {c.totalLikes.toLocaleString()}
                </span>
              </p>

            </div>

            {/* TAG STRIP */}
            <div className="mt-3 flex gap-2 flex-wrap">
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                Brand Ready
              </span>

              {c.score > 500 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  High Impact
                </span>
              )}

              {c.viralCount > 2 && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  Viral Creator
                </span>
              )}
            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}