import { ReactNode } from "react";

import WorkspaceSidebar from "./WorkspaceSidebar";
import WorkspaceTopbar from "./WorkspaceTopbar";

type WorkspaceShellProps = {
  children: ReactNode;
};

export default function WorkspaceShell({
  children,
}: WorkspaceShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f7fb] text-black">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <WorkspaceSidebar />

        {/* MAIN AREA */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* TOPBAR now visually separated + full width */}
          <div className="sticky top-0 z-30 w-full bg-[#f5f7fb]">
            <WorkspaceTopbar />
          </div>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto px-4 py-6 lg:px-8 lg:py-8">
            <div className="mx-auto w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}