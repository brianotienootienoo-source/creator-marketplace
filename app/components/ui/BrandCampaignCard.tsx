"use client";

import UnifiedCard from "@/app/components/ui/UnifiedCard";
import { workspaceTypography as t } from "@/app/lib/design/workspaceTypography";

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

        <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
          <h4 className={t.cardTitle} style={{ margin: 0 }}>
            {title}
          </h4>

          {niche && <span className={t.body}>{niche}</span>}

          {budget && <span className={t.meta}>{budget}</span>}
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <span className={t.meta}>Campaign</span>
      </div>
    </UnifiedCard>
  );
}