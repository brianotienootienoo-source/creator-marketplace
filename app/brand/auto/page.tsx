"use client";

import { useState } from "react";
import { creators } from "@/app/data/creators";
import { calculateCreatorScore } from "@/app/lib/posts";
import Link from "next/link";

export default function AutoCampaignEngine() {
  const [budget, setBudget] = useState(2000);
  const [goal, setGoal] = useState<
    "reach" | "engagement" | "viral"
  >("reach");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const runEngine = () => {
    setLoading(true);

    setTimeout(() => {
      const scored = creators.map((c) => {
        const score = calculateCreatorScore(c.slug);

        // 🧠 dynamic weighting based on campaign goal
        const goalMultiplier =
          goal === "viral"
            ? 1.7
            : goal === "engagement"
            ? 1.3
            : 1;

        const estimatedValue = score * goalMultiplier;

        // 💰 pseudo pricing model
        const cost = score * 0.45 * goalMultiplier;

        return {
          ...c,
          score,
          estimatedValue,
          cost,
        };
      });

      const filtered = scored
        .filter((c) => c.cost <= budget)
        .sort((a, b) => {
          // 🧠 core ranking logic
          return (
            b.estimatedValue -
            b.cost -
            (a.estimatedValue - a.cost)
          );
        })
        .slice(0, 10); // 🔥 top 10 ONLY (auto shortlist)

      setResults(filtered);
      setLoading(false);
    }, 600); // simulate "AI processing"
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2">
        Auto Campaign Engine
      </h1>

      <p className="text-gray-500 mb-6">
        Generate an instant shortlist of best-performing creators for your campaign
      </p>

      {/* CONTROLS */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">

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

      {/* ACTION BUTTON */}
      <button
        onClick={runEngine}
        className="bg-black text-white px-6 py-3 rounded-xl mb-10 hover:bg-gray-800 transition"
      >
        {loading ? "Generating..." : "Run Auto Engine"}
      </button>

      {/* RESULTS */}
      <div className="grid md:grid-cols-2 gap-4">

        {results.map((c, idx) => (
          <Link
            key={c.slug}
            href={`/creator/${c.slug}`}
            className="border rounded-2xl p-5 hover:shadow-md transition relative"
          >

            {/* RANK BADGE */}
            <div className="absolute top-3 right-3 text-xs bg-black text-white px-2 py-1 rounded-full">
              #{idx + 1}
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
            <div className="text-sm text-gray-600 space-y-1">

              <p>
                🏆 Score:{" "}
                <span className="font-semibold">
                  {Math.round(c.score)}
                </span>
              </p>

              <p>
                💰 Estimated Cost:{" "}
                <span className="font-semibold">
                  ${Math.round(c.cost)}
                </span>
              </p>

              <p>
                ⚡ Value Index:{" "}
                <span className="font-semibold">
                  {Math.round(c.estimatedValue - c.cost)}
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

              {c.cost < 300 && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Budget Fit
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