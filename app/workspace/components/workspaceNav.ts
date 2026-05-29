import {
  Bell,
  Briefcase,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";

export const workspaceNav = [
  {
    label: "Dashboard",
    href: "/workspace/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Opportunities",
    href: "/workspace/opportunities",
    icon: Briefcase,
  },
  {
    label: "Messages",
    href: "/workspace/messages",
    icon: MessageSquare,
  },
  {
    label: "Notifications",
    href: "/workspace/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    href: "/workspace/settings",
    icon: Settings,
  },
];