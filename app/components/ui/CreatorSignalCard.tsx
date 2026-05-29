"use client";

import React from "react";
import UnifiedCard from "@/app/components/ui/UnifiedCard";
import { getStarColor } from "@/app/lib/ratingSystem";

type Props = {
  creator: {
    id: string;
    name: string;
    avatar?: string;
    category?: string;
  };

  intelligence: {
    matchScore: number;
    trendScore: number;
    ratingScore: number;
    readinessTier: "A" | "B" | "C" | string;
    reason?: string;
  };

  compact?: boolean;
};

function Chip({
  label,
  value,
}: {
  label: string;
  value: number | string;
}) {
  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: 999,
        border: "1px solid #eee",
        background: "#fafafa",
        fontSize: 11,
        color: "#444",
        whiteSpace: "nowrap",
      }}
    >
      {label}: {value}
    </span>
  );
}

function TierBadge({ tier }: { tier: string }) {
  const color =
    tier === "A" ? "#16a34a" : tier === "B" ? "#2563eb" : "#dc2626";

  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        color,
        padding: "3px 8px",
        borderRadius: 999,
        border: `1px solid ${color}33`,
        background: `${color}10`,
      }}
    >
      Tier {tier}
    </span>
  );
}

export default function CreatorSignalCard({
  creator,
  intelligence,
  compact = false,
}: Props) {
  return (
    <UnifiedCard compact={compact}>
      <div style={{ display: "flex", gap: 10, width: "100%" }}>
        {/* AVATAR */}
        <img
          src={creator.avatar || "https://i.pravatar.cc/150"}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />

        {/* MAIN INFO */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h4
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.name}
            </h4>

            <TierBadge tier={intelligence.readinessTier} />
          </div>

          <p
            style={{
              fontSize: 11,
              color: "#777",
              marginTop: 2,
            }}
          >
            {creator.category}
          </p>

          {intelligence.reason && (
            <p
              style={{
                fontSize: 11,
                color: "#999",
                marginTop: 4,
                lineHeight: 1.3,
              }}
            >
              {intelligence.reason}
            </p>
          )}

          {/* SIGNAL ROW */}
          <div
            style={{
              display: "flex",
              gap: 6,
              flexWrap: "wrap",
              marginTop: 8,
            }}
          >
            <Chip label="Match" value={intelligence.matchScore} />
            <Chip label="Trend" value={intelligence.trendScore} />
            <Chip label="Rating" value={intelligence.ratingScore} />
          </div>
        </div>

        {/* RIGHT METRIC */}
        <div
          style={{
            textAlign: "right",
            minWidth: 50,
          }}
        >
          <div
            style={{
              fontSize: 11,
              color: getStarColor(),
              fontWeight: 600,
            }}
          >
            SIGNAL
          </div>
        </div>
      </div>
    </UnifiedCard>
  );
}