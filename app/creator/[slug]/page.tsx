import { creators } from "@/app/data/creators";
import { buildMatches } from "@/app/lib/matchEngine";

type Props = {
  params: { slug: string };
};

export default function CreatorProfile({ params }: Props) {
  const creator = creators.find((c) => c.slug === params.slug);

  if (!creator) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Creator not found</h1>
      </main>
    );
  }

  const matches = buildMatches().filter(
    (m) => m.creator.slug === creator.slug
  );

  const estimatedEarnings =
    (creator.followers || 0) * 0.02;

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>

      {/* HEADER */}
      <section style={{ marginBottom: 30 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <img
            src={creator.avatar}
            style={{
              width: 90,
              height: 90,
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid #eee",
            }}
          />

          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700 }}>
              {creator.name}
            </h1>

            <p style={{ color: "#666" }}>{creator.category}</p>
            <p style={{ fontSize: 13, color: "#999" }}>
              {creator.followers.toLocaleString()} followers
            </p>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section style={{ marginBottom: 40 }}>
        <h2>Profile Insights</h2>

        <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
          <div style={box}>
            <p style={label}>Est. Earnings</p>
            <p style={value}>${estimatedEarnings.toFixed(0)}</p>
          </div>

          <div style={box}>
            <p style={label}>Brand Readiness</p>
            <p style={value}>High</p>
          </div>

          <div style={box}>
            <p style={label}>Market Demand</p>
            <p style={value}>Strong</p>
          </div>
        </div>
      </section>

      {/* MATCHES */}
      <section style={{ marginBottom: 40 }}>
        <h2>Top Brand Matches</h2>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", marginTop: 10 }}>
          {matches.length === 0 && (
            <p style={{ color: "#666" }}>No strong matches yet.</p>
          )}

          {matches.map((m, i) => (
            <div key={i} style={card}>
              <p style={{ fontWeight: 600 }}>
                {m.brand.name}
              </p>

              <p style={{ fontSize: 12, color: "#666", marginTop: 6 }}>
                {m.reason}
              </p>

              <p style={{ fontSize: 12, marginTop: 8 }}>
                Score: {m.score}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SOCIAL LINKS (PLACEHOLDER READY) */}
      <section>
        <h2>Social Links</h2>

        <p style={{ color: "#666", marginTop: 8 }}>
          Instagram / TikTok / YouTube integration coming next
        </p>
      </section>

    </main>
  );
}

/* ---------------- UI STYLES ---------------- */

const box: React.CSSProperties = {
  padding: 12,
  border: "1px solid #eee",
  borderRadius: 10,
  minWidth: 140,
};

const label: React.CSSProperties = {
  fontSize: 12,
  color: "#666",
};

const value: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  marginTop: 4,
};

const card: React.CSSProperties = {
  minWidth: 200,
  padding: 12,
  border: "1px solid #eee",
  borderRadius: 12,
  background: "#fff",
};