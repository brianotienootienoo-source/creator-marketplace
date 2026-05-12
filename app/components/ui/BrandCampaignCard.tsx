"use client";

import UnifiedCard from "@/app/components/ui/UnifiedCard";

type Props = {
  title: string;
  niche?: string;
  budget?: string;
  image?: string;
  onClick?: () => void;
};

export default function BrandCampaignCard({
  title,
  niche,
  budget,
  image,
  onClick,
}: Props) {
  return (
    <UnifiedCard onClick={onClick}>
      {/* LEFT CONTENT */}
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
          src={image || "https://picsum.photos/100"}
          alt={title}
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
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
              lineHeight: "14px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h4>

          {niche && (
            <span
              style={{
                fontSize: 11,
                color: "#666",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {niche}
            </span>
          )}

          {budget && (
            <span
              style={{
                fontSize: 11,
                marginTop: 2,
                color: "#888",
                fontWeight: 500,
              }}
            >
              {budget}
            </span>
          )}
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
        <span
          style={{
            fontSize: 11,
            color: "#999",
            whiteSpace: "nowrap",
          }}
        >
          Campaign
        </span>
      </div>
    </UnifiedCard>
  );
}