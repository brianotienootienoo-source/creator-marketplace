"use client";

import { useState } from "react";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  footer?: string;
  actionLabel?: string;

  // 🧠 NEW: real identity
  brandId?: string;
  creatorId?: string;
};

export default function MarketplaceCard({
  title,
  subtitle,
  image,
  badge,
  footer,
  actionLabel,
  brandId,
  creatorId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleAction = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creatorId: creatorId || "unknown-creator",
          brandId: brandId || title.toLowerCase(),
          message: "Hey! I’d love to collaborate with your brand.",
        }),
      });

      await res.json();
      setApplied(true);
    } catch (err) {
      console.error("API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minWidth: 180,
        borderRadius: 16,
        overflow: "hidden",
        background: "#fff",
        border: "1px solid #eee",
        boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {image && (
        <img
          src={image}
          style={{ width: "100%", height: 110, objectFit: "cover" }}
        />
      )}

      <div style={{ padding: 12 }}>
        <p style={{ fontWeight: 600 }}>{title}</p>

        {subtitle && (
          <p style={{ fontSize: 12, color: "#666", marginTop: 4 }}>
            {subtitle}
          </p>
        )}

        {footer && (
          <p style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
            {footer}
          </p>
        )}

        {actionLabel && (
          <button
            onClick={handleAction}
            disabled={loading || applied}
            style={{
              marginTop: 10,
              padding: "6px 10px",
              borderRadius: 8,
              border: "none",
              background: applied ? "#16a34a" : "#000",
              color: "#fff",
              width: "100%",
              cursor: "pointer",
            }}
          >
            {loading ? "Applying..." : applied ? "Applied ✓" : actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}