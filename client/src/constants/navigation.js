import {
  BarChart3,
  Boxes,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["OWNER", "PROJECT_MANAGER", "SITE_ENGINEER", "STORE_MANAGER"],
  },
  {
    title: "Users",
    path: "/users",
    icon: Users,
    roles: ["OWNER", "PROJECT_MANAGER"],
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
    roles: ["OWNER", "PROJECT_MANAGER", "SITE_ENGINEER"],
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: ClipboardList,
    roles: ["OWNER", "PROJECT_MANAGER", "SITE_ENGINEER"],
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: Boxes,
    roles: ["OWNER", "PROJECT_MANAGER", "SITE_ENGINEER", "STORE_MANAGER"],
  },
  {
    title: "Reports",
    path: "/reports",
    icon: BarChart3,
    roles: ["OWNER", "PROJECT_MANAGER"],
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: ["OWNER"],
  },
  {
    title: "BuildOps AI",
    path: "/ai",
    icon: Sparkles,
    roles: ["OWNER", "PROJECT_MANAGER", "SITE_ENGINEER", "STORE_MANAGER"],
  },
];

export default navigation;