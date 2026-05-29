"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

type FeedMode =
  | "DISCOVERY_HEAVY"
  | "ENGAGEMENT_HEAVY"
  | "TREND_HEAVY"
  | "PREMIUM_STABLE";

const MODES: { key: FeedMode; label: string; desc: string }[] = [
  {
    key: "PREMIUM_STABLE",
    label: "Premium",
    desc: "Stable ranking, brand-safe feed",
  },
  {
    key: "DISCOVERY_HEAVY",
    label: "Discovery",
    desc: "Exploration-first creator mix",
  },
  {
    key: "ENGAGEMENT_HEAVY",
    label: "Engagement",
    desc: "High activity creators prioritized",
  },
  {
    key: "TREND_HEAVY",
    label: "Trending",
    desc: "Rising creators boosted",
  },
];

export default function FeedModeSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeMode =
    (searchParams.get("mode") as FeedMode) || "DISCOVERY_HEAVY";

  function setMode(mode: FeedMode) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", mode);

    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: 10,
        padding: 10,
        border: "1px solid #eee",
        borderRadius: 10,
        background: "#fafafa",
      }}
    >
      {MODES.map((m) => {
        const active = m.key === activeMode;

        return (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              flex: 1,
              padding: "10px 12px",
              borderRadius: 8,
              border: active ? "1px solid #000" : "1px solid #ddd",
              background: active ? "#111" : "#fff",
              color: active ? "#fff" : "#333",
              fontSize: 12,
              cursor: "pointer",
              transition: "all 0.15s ease",
              whiteSpace: "nowrap",
            }}
            title={m.desc}
          >
            {m.label}
          </button>
        );
      })}
    </div>
  );
}