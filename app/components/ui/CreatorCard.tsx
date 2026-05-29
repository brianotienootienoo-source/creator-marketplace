"use client";

import Link from "next/link";
import UnifiedCard from "@/app/components/ui/UnifiedCard";

import { workspaceTypography as t } from "@/app/lib/design/workspaceTypography";

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
              className={t.cardTitle}
              style={{
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.name}
            </h4>

            {creator.category && (
              <span className={t.body}>
                {creator.category}
              </span>
            )}

            <span
              className={t.body}
              style={{ marginTop: 2, fontWeight: 500 }}
            >
              {label}
            </span>

            <span className={t.tiny} style={{ marginTop: 3 }}>
              {insight}
            </span>

            {showSignals && signals && (
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 6,
                  flexWrap: "wrap",
                }}
              >
                <span className={t.tiny}>
                  M:{signals.matchScore ?? 0}
                </span>
                <span className={t.tiny}>
                  T:{signals.trendScore ?? 0}
                </span>
                <span className={t.tiny}>
                  R:{signals.rating ?? 0}
                </span>
              </div>
            )}
          </div>
        </div>

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