"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { creators } from "@/app/data/creators";
import { getGlobalFeed } from "@/app/lib/feedEngine";
import { getPosts } from "@/app/lib/posts";

import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";
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
        <Card className="p-8 bg-gradient-to-r from-blue-500 to-sky-400 text-white">
          <h1 className="text-3xl font-bold">
            {heroSlides[featuredIndex].title}
          </h1>

          <p className="mt-2 opacity-90">
            {heroSlides[featuredIndex].desc}
          </p>

          <div className="mt-4 flex gap-3">
            <Button>
              <Link href="/feed">Enter Feed</Link>
            </Button>

            <Button variant="secondary">
              <Link href="/market">Explore Market</Link>
            </Button>
          </div>
        </Card>
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
            <Card key={cat} className="px-4 py-2 whitespace-nowrap">
              <p className="text-sm">{cat}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* TRENDING */}
      <Section title="Trending Now">
        <div className="flex gap-4 overflow-x-auto">
          {feed.map((p) => (
            <Card
              key={p.id}
              className="min-w-[220px] p-4 hover:scale-[1.02] transition"
            >
              <p className="font-semibold">{p.title}</p>
              <p className="text-xs text-gray-500 mt-2">
                ❤️ {p.likes}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* MARKET */}
      <Section title="Market Snapshot">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <p className="font-semibold">Top Niches</p>
            <p className="text-sm text-gray-500">
              Fashion, Tech, Auto
            </p>
          </Card>

          <Card className="p-4">
            <p className="font-semibold">Active Deals</p>
            <p className="text-sm text-gray-500">
              12 open campaigns
            </p>
          </Card>
        </div>
      </Section>

      {/* CREATORS */}
      <Section title="Top Creators This Week">
        <div className="flex gap-4 overflow-x-auto">
          {creatorShuffle.map((c) => (
            <Link key={c.slug} href={`/creator/${c.slug}`}>
              <Card className="p-4 min-w-[150px] text-center">
                <Avatar src={c.avatar} size={50} />

                <p className="mt-2 font-semibold text-sm">
                  {c.name}
                </p>

                <p className="text-xs text-gray-500">
                  Score: {c.score}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

    </main>
  );
}