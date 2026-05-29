"use client";

import { workspaceNav } from "./workspaceNav";
import WorkspaceNavItem from "./WorkspaceNavItem";

export default function WorkspaceSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#e5e7eb] bg-white lg:flex lg:flex-col">
      {/* REMOVED HEADING BLOCK (cleaner hierarchy) */}

      <nav className="flex flex-1 flex-col gap-2 p-4 pt-6">
        {workspaceNav.map((item) => (
          <WorkspaceNavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
          />
        ))}
      </nav>
    </aside>
  );
}