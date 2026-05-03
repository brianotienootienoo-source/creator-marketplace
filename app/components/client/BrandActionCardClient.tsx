"use client";

import MarketplaceCard from "@/app/components/ui/MarketplaceCard";

type Props = {
  brand: any;
  creatorId?: string;
};

export default function BrandActionCardClient({
  brand,
  creatorId = "demo-creator",
}: Props) {
  return (
    <MarketplaceCard
      title={brand.title}
      subtitle={brand.subtitle}
      footer="Live Brand Deal"
      badge="Brand"
      actionLabel="Apply"

      onAction={async () => {
        try {
          const res = await fetch("/api/proposals", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              creatorId,
              brandId: brand.id,
              message: "Hey! I’d love to collaborate with your brand.",
            }),
          });

          const data = await res.json();

          console.log("Proposal created:", data);
        } catch (err) {
          console.error("Failed to create proposal:", err);
        }
      }}
    />
  );
}