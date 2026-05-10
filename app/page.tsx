"use client";

import { useEffect, useMemo, useState } from "react";
import MarketplaceCard from "@/app/components/ui/MarketplaceCard";
import CreatorCard from "@/app/components/ui/CreatorCard";
import { campaigns } from "@/app/data/campaigns";
import { buildFeedV2 } from "@/app/lib/feedV2";
import ViewAllButton from "@/app/components/ui/ViewAllButton";

import { routeFeedStreams } from "@/app/lib/streams/streamRouter";
import { getActiveStreamMode } from "@/app/lib/streams/streamSwitchEngine";

type FeedItem = {
  type?: "creator" | "brand" | "match";
  id?: string;
  name?: string;
  subtitle?: string;
  category?: string;
  avatar?: string;
  score?: number;
};

export default function Home() {
  const [feed, setFeed] = useState<FeedItem[]>([]);
  const [mode, setMode] = useState<"forYou" | "explore" | "mixed">("forYou");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    try {
      const raw = buildFeedV2();
      setFeed(Array.isArray(raw) ? raw : []);
    } catch {
      setFeed([]);
    }
  }, []);

  const streams = useMemo(() => {
    if (!feed.length) return { forYou: [], explore: [] };
    return routeFeedStreams(feed);
  }, [feed]);

  useEffect(() => {
    setMode(getActiveStreamMode());
  }, []);

  const activeFeed = streams?.forYou?.length ? streams.forYou : feed;

  const creators = activeFeed.filter((f) => f?.type === "creator");
  const brands = activeFeed.filter((f) => f?.type === "brand");

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      {/* HERO */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Creator–Brand Marketplace
        </h1>

        <p style={{ marginTop: 10, color: "#555" }}>
          Connect brands with creators through live opportunities and campaigns.
        </p>

        <p style={{ fontSize: 12, color: "#999", marginTop: 6 }}>
          Stream mode: {hydrated ? mode : "loading..."}
        </p>
      </section>

      {/* BRAND SIGNALS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Brand Signals</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
          {brands.length ? (
            brands.slice(0, 6).map((b) => (
              <div key={b.id ?? "brand"} style={{ minWidth: 180 }}>
                <MarketplaceCard
                  title={b?.name ?? "Brand"}
                  subtitle={b?.subtitle ?? ""}
                  footer="Active demand"
                  actionLabel="View"
                  isAction={false}
                  href={`/brands/${b?.id ?? "#"}`}
                />
              </div>
            ))
          ) : (
            <p style={{ color: "#999" }}>No brand signals yet</p>
          )}
        </div>
      </section>

      {/* LIVE CAMPAIGNS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Live Campaigns</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
            marginTop: 10,
          }}
        >
          {campaigns.map((c) => (
            <MarketplaceCard
              key={c.id}
              title={c.title}
              subtitle={c.niche}
              footer={c.budget}
              image={c.image}
              actionLabel="Apply"
              isAction
              brandId={c.brandId}
              creatorId="demo"
              campaignId={c.id}
            />
          ))}
        </div>

        <div style={{ marginTop: 12 }}>
          <ViewAllButton />
        </div>
      </section>

      {/* LIVE CREATORS */}
      <section style={{ marginTop: 40 }}>
        <h2>Live Creators</h2>

        <div style={{ display: "flex", gap: 14, overflowX: "auto" }}>
          {creators.length ? (
            creators.slice(0, 12).map((c) => (
              <div key={c.id ?? c.name} style={{ minWidth: 200 }}>
                <CreatorCard
                  creator={{
                    id: c.id,
                    name: c.name,
                    category: c.category,
                    avatar: c.avatar,
                  }}
                  score={c.score}
                />
              </div>
            ))
          ) : (
            <p style={{ color: "#999" }}>No creators yet</p>
          )}
        </div>
      </section>
    </main>
  );
}