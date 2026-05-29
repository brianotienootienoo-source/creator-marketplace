const stats = [
  { label: "Profile Views", value: "12.4K", change: "+18%" },
  { label: "Campaign Invites", value: "28", change: "+6%" },
  { label: "Engagement Rate", value: "5.8%", change: "+1.2%" },
  { label: "Saved By Brands", value: "94", change: "+12%" },
];

const activity = [
  "A fashion brand viewed your profile",
  "Your creator visibility increased this week",
  "New campaign opportunities are available",
  "Your engagement is trending upward",
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* HUB HEADER */}
      <div className="space-y-1">
        <h1 className="text-[26px] font-bold text-black tracking-tight">
          Dashboard
        </h1>
        <p className="text-sm text-neutral-500">
          Monitor your creator activity and marketplace presence.
        </p>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="text-xs text-neutral-500">{stat.label}</p>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-black">
                {stat.value}
              </h2>

              <span className="text-xs text-neutral-500">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Performance Snapshot
          </h3>

          <div className="mt-6 flex h-64 items-end gap-3">
            {[35, 55, 40, 75, 60, 90, 70].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-2xl bg-black/80"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-neutral-500">
                  W{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Recent Activity
          </h3>

          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-3"
              >
                <p className="text-xs text-neutral-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}