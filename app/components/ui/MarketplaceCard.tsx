"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  title: string;
  subtitle?: string;
  image?: string;
  footer?: string;
  actionLabel?: string;

  brandId?: string;
  creatorId?: string;

  isAction?: boolean;
  campaignId?: string;
  href?: string;
};

export default function MarketplaceCard({
  title,
  subtitle,
  image,
  footer,
  actionLabel,
  brandId,
  creatorId,
  isAction = false,
  campaignId,
  href,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleClick = async () => {
    // =====================
    // APPLY MODE
    // =====================
    if (isAction) {
      if (loading || applied) return;

      // 🚨 HARD GUARD: prevent fake submissions
      if (!creatorId) {
        console.warn("Missing creatorId on apply action:", title);
        return;
      }

      setLoading(true);

      try {
        await fetch("/api/proposals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creatorId, // 🔥 now strictly required
            brandId: brandId || title.toLowerCase(),
            message: "Hey! I’d love to collaborate with your brand.",
          }),
        });

        setApplied(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      return;
    }

    // =====================
    // VIEW MODE
    // =====================
    const target = campaignId ? `/campaigns/${campaignId}` : href;

    if (!target) {
      console.warn("No route defined for:", title);
      return;
    }

    router.push(target);
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
            onClick={handleClick}
            disabled={loading || applied}
            style={{
              marginTop: 10,
              padding: "6px 10px",
              borderRadius: 8,
              border: "none",
              width: "100%",

              background: applied ? "#16a34a" : "#000",
              color: "#fff",

              cursor: "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading
              ? "Loading..."
              : applied
              ? "Applied ✓"
              : actionLabel}
          </button>
        )}
      </div>
    </div>
  );
}