"use client";

import { useState } from "react";
import { creators } from "@/app/data/creators";
import { calculateCreatorScore } from "@/app/lib/posts";
import Link from "next/link";

export default function CampaignBuilder() {
  const [budget, setBudget] = useState<number>(1000);
  const [minScore, setMinScore] = useState<number>(0);
  const [goal, setGoal] = useState<
    "reach" | "engagement" | "viral"
  >("reach");

  const [results, setResults] = useState<any[]>([]);

  const runCampaign = () => {
    const ranked = creators
      .map((c) => {
        const score = calculateCreatorScore(c.slug);

        // 💰 estimated pricing model (simple version)
        const baseRate = score * 0.5;

        const multiplier =
          goal === "viral"
            ? 1.8
            : goal === "engagement"
            ? 1.3
            : 1;

        const estimatedCost = baseRate * multiplier;

        return {
          ...c,
          score,
          estimatedCost,
        };
      })
      .filter((c) => c.score >= minScore)
      .filter((c) => c.estimatedCost <= budget)
      .sort((a, b) => b.score - a.score);

    setResults(ranked);
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Campaign Builder
      </h1>

      <p className="text-gray-500 mb-6">
        Build influencer campaigns and match creators based on budget and performance
      </p>

      {/* CONTROLS */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <div>
          <label className="text-sm text-gray-600">
            Budget ($)
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) =>
              setBudget(Number(e.target.value))
            }
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Min Creator Score
          </label>
          <input
            type="number"
            value={minScore}
            onChange={(e) =>
              setMinScore(Number(e.target.value))
            }
            className="w-full border rounded-xl px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Campaign Goal
          </label>

          <select
            value={goal}
            onChange={(e) =>
              setGoal(
                e.target.value as
                  | "reach"
                  | "engagement"
                  | "viral"
              )
            }
            className="w-full border rounded-xl px-3 py-2"
          >
            <option value="reach">Reach</option>
            <option value="engagement">Engagement</option>
            <option value="viral">Viral Growth</option>
          </select>
        </div>

      </div>

      {/* ACTION */}
      <button
        onClick={runCampaign}
        className="bg-black text-white px-6 py-3 rounded-xl mb-10 hover:bg-gray-800 transition"
      >
        Run Campaign Match
      </button>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-4">
        {results.map((c) => (
          <Link
            key={c.slug}
            href={`/creator/${c.slug}`}
            className="border rounded-2xl p-5 hover:shadow-md transition"
          >

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
            <div className="text-sm text-gray-600 space-y-1">

              <p>
                🏆 Score:{" "}
                <span className="font-semibold">
                  {c.score}
                </span>
              </p>

              <p>
                💰 Estimated Cost:{" "}
                <span className="font-semibold">
                  ${Math.round(c.estimatedCost)}
                </span>
              </p>

            </div>

            {/* TAGS */}
            <div className="mt-3 flex gap-2 flex-wrap">

              {c.score > 800 && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  High Performer
                </span>
              )}

              {c.estimatedCost < 500 && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Budget Friendly
                </span>
              )}

              {goal === "viral" && (
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                  Viral Optimised
                </span>
              )}

            </div>

          </Link>
        ))}
      </div>

    </main>
  );
}