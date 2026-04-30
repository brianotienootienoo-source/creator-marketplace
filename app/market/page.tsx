"use client";

import { useEffect, useState } from "react";
import { getMarketLeaderboard } from "@/app/lib/market";
import Link from "next/link";

export default function MarketPage() {
  const [creators, setCreators] = useState<any[]>([]);

  const load = () => {
    setCreators(getMarketLeaderboard());
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-2">
        Creator Market
      </h1>

      <p className="text-gray-500 mb-8">
        Live influencer valuation & performance index
      </p>

      <div className="grid md:grid-cols-2 gap-4">

        {creators.map((c, i) => (
          <Link
            key={c.slug}
            href={`/creator/${c.slug}`}
            className="border rounded-2xl p-5 hover:shadow-md transition"
          >

            {/* RANK */}
            <div className="text-xs text-gray-400 mb-2">
              Rank #{i + 1}
            </div>

            {/* CREATOR */}
            <div className="flex items-center gap-3 mb-3">

              <img
                src={c.avatar}
                className="w-12 h-12 rounded-full"
              />

              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-xs text-gray-500">
                  @{c.slug}
                </p>
              </div>

            </div>

            {/* METRICS */}
            <div className="text-sm space-y-1 text-gray-600">

              <p>
                💰 Price:{" "}
                <span className="font-semibold">
                  ${c.price.toLocaleString()}
                </span>
              </p>

              <p>
                🏆 Score:{" "}
                <span className="font-semibold">
                  {Math.round(c.score)}
                </span>
              </p>

              <p>
                📊 Momentum:{" "}
                <span
                  className={`font-semibold ${
                    c.trend === "rising"
                      ? "text-green-600"
                      : c.trend === "declining"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {c.trend.toUpperCase()}
                </span>
              </p>

            </div>

          </Link>
        ))}

      </div>

    </main>
  );
}