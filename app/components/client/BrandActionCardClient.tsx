"use client";

import { useState } from "react";
import BrandInsights from "@/app/components/ui/BrandInsights";
import AnimatedCard from "@/app/components/ui/AnimatedCard";

type Props = {
  brandId: string;
};

export default function BrandActionCardClient({ brandId }: Props) {
  const [showStats, setShowStats] = useState(false);

  return (
    <AnimatedCard>
      <div
        style={{
          marginTop: 16,
          padding: 12,
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowStats(!showStats)}
            style={{
              height: 44,
              minWidth: 140,
              padding: "0 14px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#1f2937",
              color: "#fff",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              lineHeight: 1,
              boxSizing: "border-box",
            }}
          >
            {showStats ? "Hide Key Stats" : "View Key Stats"}
          </button>
        </div>

        {showStats && (
          <div style={{ marginTop: 12 }}>
            <BrandInsights brandId={brandId} />
          </div>
        )}
      </div>
    </AnimatedCard>
  );
}