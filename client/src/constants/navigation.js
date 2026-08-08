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
  },
  {
    title: "Employees",
    path: "/users",
    icon: Users,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Attendance",
    path: "/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: Boxes,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];