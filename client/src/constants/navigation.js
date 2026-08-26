import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ClipboardCheck,
  Boxes,
  FileText,
  Settings,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
    ],
  },

  {
    title: "Employees",
    path: "/users",
    icon: Users,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
    ],
  },

  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
    ],
  },

  {
    title: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
    ],
  },

  {
    title: "Inventory",
    path: "/inventory",
    icon: Boxes,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
      "SITE_ENGINEER",
    ],
  },

  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
    roles: [
      "OWNER",
      "PROJECT_MANAGER",
    ],
  },

  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
    roles: [
      "OWNER",
    ],
  },
];