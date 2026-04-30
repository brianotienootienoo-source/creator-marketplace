"use client";

import { useEffect, useState } from "react";
import { creators } from "@/app/data/creators";
import CreatorCard from "@/app/components/CreatorCard";
import { getFollowing, toggleFollowing } from "@/app/lib/following";
import Link from "next/link";

// 🧠 C17-A intelligence layer
import {
  calculateCreatorScore,
  getCreatorTier,
  getCreatorPrice,
  getCreatorTrend,
} from "@/app/lib/posts";

export default function FollowingPage() {
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    setFollowing(getFollowing());
  }, []);

  const handleFollow = (name: string) => {
    const updated = toggleFollowing(name);
    setFollowing([...updated]);
  };

  // 🧠 ENRICH FOLLOWED CREATORS
  const followedCreators = creators
    .filter((c) => following.includes(c.name))
    .map((c) => ({
      ...c,
      score: calculateCreatorScore(c.slug),
      tier: getCreatorTier(c.slug),
      price: getCreatorPrice(c.slug),
      trend: getCreatorTrend(c.slug),
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Following</h1>
        <p className="text-gray-500 mt-2">
          Your personalized creator network
        </p>
      </div>

      {/* EMPTY STATE */}
      {followedCreators.length === 0 ? (
        <div className="text-center py-20 border rounded-2xl">
          <h2 className="text-xl font-semibold mb-2">
            You’re not following anyone yet
          </h2>
          <p className="text-gray-500 mb-6">
            Start exploring creators to build your network feed
          </p>

          <Link
            href="/browse"
            className="px-5 py-3 bg-black text-white rounded-xl"
          >
            Discover Creators
          </Link>
        </div>
      ) : (
        /* GRID */
        <div className="grid md:grid-cols-3 gap-8">
          {followedCreators.map((c) => (
            <CreatorCard
              key={c.name}
              creator={c}
              isFollowing={true}
              onToggleFollow={handleFollow}
            />
          ))}
        </div>
      )}

    </main>
  );
}