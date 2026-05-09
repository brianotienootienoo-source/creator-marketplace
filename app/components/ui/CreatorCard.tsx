"use client";

import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";
import {
  getCreatorStars,
  getCreatorLabel,
} from "@/app/lib/creatorIntelligence";

/* -----------------------------
   TYPES
------------------------------*/
type Props = {
  creator: {
    id: string;
    name: string;
    category?: string;
    avatar?: string;
    trend?: string;
    trendColor?: string;
  };

  score: number;
};

/* -----------------------------
   GLOBAL CREATOR CARD (FIXED TILE)
------------------------------*/
export default function CreatorCard({ creator, score }: Props) {
  const label = getCreatorLabel(score);
  const stars = getCreatorStars(score);

  return (
    <AnimatedCard>
      <CardShell>
        {/* LEFT SIDE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: "100%",
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

              // 🔥 CRITICAL: prevents vertical stretching differences
              minWidth: 0,
              flex: 1,
            }}
          >
            <h4
              style={{
                margin: 0,
                fontSize: 13,
                lineHeight: "14px",

                // 🔥 prevents wrapping size shifts
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.name}
            </h4>

            {creator.category && (
              <span
                style={{
                  fontSize: 11,
                  color: "#666",

                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {creator.category}
              </span>
            )}

            <span
              style={{
                fontSize: 11,
                marginTop: 2,
                color: creator.trendColor || "#999",
                fontWeight: 500,

                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {creator.trend || label}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            textAlign: "right",
            flexShrink: 0,
            marginLeft: 10,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "1px",
              color: "#f5b301",
              whiteSpace: "nowrap",
            }}
          >
            {stars}
          </div>
        </div>
      </CardShell>
    </AnimatedCard>
  );
}