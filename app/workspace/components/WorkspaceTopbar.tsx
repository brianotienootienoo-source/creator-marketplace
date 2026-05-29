"use client";

import { Bell, Search } from "lucide-react";

export default function WorkspaceTopbar() {
  return (
    <header className="mx-4 mt-4 flex h-16 items-center justify-between rounded-2xl border border-[#e5e7eb] bg-white px-4 shadow-sm lg:mx-8">
      {/* LEFT (intentionally minimal — no page titles here anymore) */}
      <div className="text-sm font-semibold text-black">
        Workspace
      </div>

      {/* RIGHT ACTIONS */}
      <div className="flex items-center gap-3">
        <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-neutral-600 transition hover:text-black">
          <Search size={18} />
        </button>

        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] bg-white text-neutral-600 transition hover:text-black">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-black" />
        </button>
      </div>
    </header>
  );
}