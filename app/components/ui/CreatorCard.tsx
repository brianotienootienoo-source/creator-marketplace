"use client";

import Link from "next/link";
import UnifiedCard from "@/app/components/ui/UnifiedCard";

import {
  getStars,
  getLabel,
  getStarColor,
} from "@/app/lib/ratingSystem";

import { getCardInsightLabel } from "@/app/lib/intelligence/cardIntelligence";

type Props = {
  creator: {
    id: string;
    name: string;
    category?: string;
    avatar?: string;
    slug?: string;
  };

  score: number;
  compact?: boolean;

  // 🧠 NEW: optional signal layer (non-breaking)
  signals?: {
    matchScore?: number;
    trendScore?: number;
    rating?: number;
  };

  showSignals?: boolean;
};

export default function CreatorCard({
  creator,
  score,
  compact,
  signals,
  showSignals = false,
}: Props) {
  const label = getLabel(score);
  const stars = getStars(score);
  const insight = getCardInsightLabel(score);

  const href = creator.slug
    ? `/creators/${creator.slug}`
    : `/creators/${creator.id}`;

  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
      }}
    >
      <UnifiedCard compact={compact}>
        {/* LEFT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
            minWidth: 0,
          }}
        >
          <img
            src={creator.avatar || "https://i.pravatar.cc/150"}
            alt={creator.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              objectFit: "cover",
              flexShrink: 0,
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
              flex: 1,
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: 13,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.name}
            </h4>

            {creator.category && (
              <span style={{ fontSize: 11, color: "#666" }}>
                {creator.category}
              </span>
            )}

            <span
              style={{
                fontSize: 11,
                marginTop: 2,
                color: "#111",
                fontWeight: 500,
              }}
            >
              {label}
            </span>

            <span style={{ fontSize: 10, marginTop: 3, color: "#888" }}>
              {insight}
            </span>

            {/* 🧠 SIGNAL OVERLAY (OPTIONAL) */}
            {showSignals && signals && (
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 10, color: "#666" }}>
                  M:{signals.matchScore ?? 0}
                </span>
                <span style={{ fontSize: 10, color: "#666" }}>
                  T:{signals.trendScore ?? 0}
                </span>
                <span style={{ fontSize: 10, color: "#666" }}>
                  R:{signals.rating ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            textAlign: "right",
            marginLeft: 10,
            fontSize: 11,
            letterSpacing: "1px",
            color: getStarColor(),
            whiteSpace: "nowrap",
          }}
        >
          {stars}
        </div>
      </UnifiedCard>
    </Link>
  );
}