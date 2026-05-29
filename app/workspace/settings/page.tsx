export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* HUB HEADER */}
      <div className="space-y-1">
        <h1 className="text-[26px] font-bold text-black tracking-tight">
          Settings
        </h1>
        <p className="text-sm text-neutral-500">
          Manage your profile and preferences.
        </p>
      </div>

      {/* CONTENT */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-[#e5e7eb] bg-white p-3 text-sm" placeholder="Creator Name" />
          <input className="rounded-xl border border-[#e5e7eb] bg-white p-3 text-sm" placeholder="Category" />
          <input className="rounded-xl border border-[#e5e7eb] bg-white p-3 text-sm" placeholder="Instagram" />
          <input className="rounded-xl border border-[#e5e7eb] bg-white p-3 text-sm" placeholder="TikTok" />
        </div>

        <div className="mt-5 rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
          <p className="text-xs text-neutral-600">
            Open for collaborations toggle (UI only)
          </p>
        </div>
      </div>
    </div>
  );
}