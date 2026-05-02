"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { creators } from "@/app/data/creators";
import { getGlobalFeed } from "@/app/lib/feedEngine";
import { getPosts } from "@/app/lib/posts";

import Avatar from "@/app/components/ui/Avatar";
import Section from "@/app/components/ui/Section";

export default function HomePage() {
  const [feed, setFeed] = useState<any[]>([]);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [creatorShuffle, setCreatorShuffle] = useState<any[]>([]);

  useEffect(() => {
    setFeed(getGlobalFeed().slice(0, 10));

    const ranked = creators
      .map((c) => {
        const posts = getPosts().filter(
          (p) => p.creatorSlug === c.slug
        );

        return {
          ...c,
          score: posts.reduce((s, p) => s + (p.likes || 0), 0),
        };
      })
      .sort((a, b) => b.score - a.score);

    setCreatorShuffle(ranked.slice(0, 8));

    const interval = setInterval(() => {
      setFeaturedIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      title: "Creator × Brand Ecosystem",
      desc: "Where creators meet real opportunities",
    },
    {
      title: "Trending Campaigns",
      desc: "See what’s going viral right now",
    },
    {
      title: "Live Collaborations",
      desc: "Brands actively hiring creators",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 text-black">

      {/* HERO */}
      <Section>
        <div className="ui-card p-10 bg-gradient-to-r from-blue-500 to-sky-400 text-white border-none">
          <h1 className="text-3xl font-bold">
            {heroSlides[featuredIndex].title}
          </h1>

          <p className="mt-2 opacity-90">
            {heroSlides[featuredIndex].desc}
          </p>

          <div className="mt-5 flex gap-3">
            <Link href="/feed">
              <button className="btn-primary">
                Enter Feed
              </button>
            </Link>

            <Link href="/market">
              <button className="btn-primary bg-white text-blue-600 shadow-none">
                Explore Market
              </button>
            </Link>
          </div>
        </div>
      </Section>

      {/* CATEGORY STRIP */}
      <Section title="Explore">
        <div className="flex gap-3 overflow-x-auto">
          {[
            "Trending",
            "Creators",
            "Brands",
            "Collabs",
            "Market",
            "Opportunities",
          ].map((cat) => (
            <div
              key={cat}
              className="ui-card px-5 py-2 whitespace-nowrap border-none shadow-sm"
            >
              <p className="text-sm">{cat}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 🔥 TRENDING (MEDIA STYLE — FIXED) */}
      <Section title="Trending Now">
        <div className="row-scroll">

          {feed.map((p) => (
            <div
              key={p.id}
              className="media-card w-[260px] h-[160px]"
            >
              {/* IMAGE */}
              <img
                src={`https://picsum.photos/400/300?random=${p.id}`}
                alt={p.title}
              />

              {/* DARK OVERLAY */}
              <div className="media-overlay" />

              {/* TEXT */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-sm font-semibold leading-tight">
                  {p.title}
                </p>

                <p className="text-xs opacity-80 mt-1">
                  ❤️ {p.likes}
                </p>
              </div>
            </div>
          ))}

        </div>
      </Section>

      {/* MARKET */}
      <Section title="Market Snapshot">
        <div className="grid grid-cols-2 gap-5">
          <div className="ui-card p-5 border-none">
            <p className="font-semibold">Top Niches</p>
            <p className="text-sm text-gray-500">
              Fashion, Tech, Auto
            </p>
          </div>

          <div className="ui-card p-5 border-none">
            <p className="font-semibold">Active Deals</p>
            <p className="text-sm text-gray-500">
              12 open campaigns
            </p>
          </div>
        </div>
      </Section>

      {/* CREATORS */}
      <Section title="Top Creators This Week">
        <div className="flex gap-5 overflow-x-auto">
          {creatorShuffle.map((c) => (
            <Link key={c.slug} href={`/creator/${c.slug}`}>
              <div className="ui-card p-5 min-w-[170px] text-center border-none">
                <Avatar src={c.avatar} size={52} />

                <p className="mt-3 font-semibold text-sm">
                  {c.name}
                </p>

                <p className="text-xs text-gray-500">
                  Score: {c.score}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

    </main>
  );
}