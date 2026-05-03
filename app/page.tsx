import MarketplaceCard from "@/app/components/ui/MarketplaceCard";
import { buildFeedV2 } from "@/app/lib/feedV2";

export default function Home() {
  const feed = buildFeedV2() || [];

  const creators = feed.filter((f) => f?.type === "creator");
  const brands = feed.filter((f) => f?.type === "brand");

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>

      {/* HERO */}
      <section style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700 }}>
          Creator–Brand Marketplace
        </h1>
        <p style={{ marginTop: 10, color: "#555" }}>
          Connect brands with creators, musicians, and comedians for real-world deals.
        </p>
      </section>

      {/* FEED V2 */}
      <section style={{ marginBottom: 40 }}>
        <h2>Discover Marketplace</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginTop: 10 }}>
          {feed.map((item) => (
            <div
              key={`${item?.type}-${item?.id}`}
              style={{
                minWidth: 240,
                padding: 14,
                border: "1px solid #eee",
                borderRadius: 12,
                background: "#fff",
              }}
            >
              <p style={{ fontWeight: 600 }}>{item?.title}</p>

              <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                {item?.subtitle}
              </p>

              <p style={{ fontSize: 11, marginTop: 8, color: "#999" }}>
                Type: {item?.type} • Score: {item?.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND LAYER (SAFE - NO CLIENT ACTIONS HERE) */}
      <section style={{ marginBottom: 40 }}>
        <h2>Brand Opportunities</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginTop: 10 }}>
          {brands.map((b, i) => (
            <MarketplaceCard
              key={`${b?.id}-${i}`}
              title={b?.title}
              subtitle={b?.subtitle}
              footer="Live Brand Deal"
              badge="Brand"
              actionLabel="Apply"
            />
          ))}
        </div>
      </section>

      {/* SNAPSHOT */}
      <section style={{ marginBottom: 40 }}>
        <h2>Market Snapshot</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 10 }}>
          <MarketplaceCard
            title="Trending Niches"
            subtitle="Fashion, Music, Comedy"
            badge="Market"
          />

          <MarketplaceCard
            title="Active Campaigns"
            subtitle="Live brand deals + creator bids"
            badge="Live"
          />
        </div>
      </section>

      {/* LIVE CREATORS */}
      <section style={{ marginTop: 40 }}>
        <h2>Live Creators</h2>

        <div style={{ display: "flex", gap: 14, overflowX: "auto", paddingBottom: 10 }}>
          {creators.slice(0, 12).map((c, i) => (
            <div
              key={`${c?.id}-${i}`}
              style={{ minWidth: 90, textAlign: "center" }}
            >
              <img
                src={c?.image}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #eee",
                }}
              />
              <p style={{ fontSize: 11, marginTop: 6 }}>
                {c?.title}
              </p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}