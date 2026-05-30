"use client";

import { workspaceNav } from "./workspaceNav";
import WorkspaceNavItem from "./WorkspaceNavItem";
import { getCreatorThreads } from "@/app/lib/messages/getThreads";

export default function WorkspaceSidebar() {
  // 🔥 Compute total unread messages across all threads
  const threads = getCreatorThreads("creator-1");

  const unreadMessages = threads.reduce(
    (total, thread) => total + thread.unreadCount,
    0
  );

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#e5e7eb] bg-white lg:flex lg:flex-col">

      <nav className="flex flex-1 flex-col gap-2 p-4 pt-6">
        {workspaceNav.map((item) => (
          <WorkspaceNavItem
            key={item.href}
            label={item.label}
            href={item.href}
            icon={item.icon}
            badge={
              item.label === "Messages" && unreadMessages > 0
                ? unreadMessages
                : undefined
            }
          />
        ))}
      </nav>

    </aside>
  );
}