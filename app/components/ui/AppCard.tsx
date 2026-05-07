"use client";

import AnimatedCard from "@/app/components/ui/AnimatedCard";

type Props = {
  children: React.ReactNode;
  padding?: number;
};

export default function AppCard({ children, padding = 12 }: Props) {
  return (
    <AnimatedCard>
      <div
        style={{
          padding,
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          background: "#fff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
          transition: "all 0.2s ease",
        }}
      >
        {children}
      </div>
    </AnimatedCard>
  );
}