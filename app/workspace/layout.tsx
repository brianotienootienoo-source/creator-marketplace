import WorkspaceShell from "./components/WorkspaceShell";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="workspace-root min-h-screen bg-[#f5f7fb] text-black">
      <WorkspaceShell>{children}</WorkspaceShell>
    </div>
  );
}