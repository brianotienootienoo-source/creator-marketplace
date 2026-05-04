"use client";

import { useRouter } from "next/navigation";

export default function ViewAllButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/campaigns")}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      View All Campaigns →
    </button>
  );
}