"use client";

import { useEffect, useState } from "react";
import { creators } from "../data/creators";
import CreatorCard from "../components/CreatorCard";
import { getFollowing, toggleFollowing } from "../lib/following";

// 🧠 NEW: backend intelligence layer
import {
  calculateCreatorScore,
  getCreatorTier,
  getCreatorPrice,
  getCreatorTrend,
} from "../lib/posts";

export default function BrowsePage() {
  const [following, setFollowing] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [activeNiche, setActiveNiche] = useState("");

  useEffect(() => {
    setFollowing(getFollowing());
  }, []);

  const handleFollow = (name: string) => {
    const updated = toggleFollowing(name);
    setFollowing([...updated]);
  };

  const niches = ["Music", "Fitness", "Tech", "Comedy"];

  // 🧠 ENRICHED CREATOR DATA (C17-A upgrade)
  const enrichedCreators = creators.map((c) => ({
    ...c,
    score: calculateCreatorScore(c.slug),
    tier: getCreatorTier(c.slug),
    price: getCreatorPrice(c.slug),
    trend: getCreatorTrend(c.slug),
  }));

  const filteredCreators = enrichedCreators.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesNiche =
      activeNiche === "" || c.niche === activeNiche;

    return matchesSearch && matchesNiche;
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">
          Browse Creators
        </h1>
        <p className="text-gray-500 mt-2">
          Discover creators powered by ranking intelligence
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search creators..."
          className="w-full md:w-1/2 border rounded-xl px-4 py-2"
        />

        <div className="flex gap-2 flex-wrap">

          <button
            onClick={() => setActiveNiche("")}
            className={`px-3 py-2 rounded-xl border transition ${
              activeNiche === ""
                ? "bg-black text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            All
          </button>

          {niches.map((n) => (
            <button
              key={n}
              onClick={() => setActiveNiche(n)}
              className={`px-3 py-2 rounded-xl border transition ${
                activeNiche === n
                  ? "bg-black text-white"
                  : "bg-white hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          ))}

        </div>
      </div>

      {/* GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {filteredCreators
          .sort((a, b) => b.score - a.score) // 🧠 NEW: backend ranking
          .map((c) => (
            <CreatorCard
              key={c.name}
              creator={c}
              isFollowing={following.includes(c.name)}
              onToggleFollow={handleFollow}
            />
          ))}
      </div>

    </main>
  );
}