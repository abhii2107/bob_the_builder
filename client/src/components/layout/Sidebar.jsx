import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import { useAuthStore } from "@/store/authStore";
import { navigation } from "@/constants/navigation";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function SidebarContent({ onNavigate }) {
  const { user } = useAuthStore();

  const userRole = user?.role;

  const visibleNavigation = navigation.filter((item) =>
    item.roles?.includes(userRole)
  );

  const firstName = user?.firstName || "User";
  const lastName = user?.lastName || "";

  const initials = `${firstName?.[0] || ""}${
    lastName?.[0] || ""
  }`.toUpperCase();

  const roleLabel = userRole
    ? userRole
        .split("_")
        .map(
          (word) =>
            word.charAt(0) + word.slice(1).toLowerCase()
        )
        .join(" ")
    : "User";

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-[72px] items-center border-b px-5">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-white shadow-sm">
            B
          </div>

          <div className="leading-tight">
            <h1 className="text-[15px] font-semibold tracking-tight text-slate-900">
              BuildOps
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-slate-500">
              Construction ERP
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
          Workspace
        </p>

        <nav className="space-y-1">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onNavigate}
                className={({ isActive }) =>
                  [
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5",
                    "text-sm font-medium",
                    "transition-all duration-200 ease-out",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-600" />
                    )}

                    <Icon
                      className={[
                        "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
                        isActive
                          ? "text-blue-600"
                          : "text-slate-400 group-hover:text-slate-600",
                      ].join(" ")}
                    />

                    <span>{item.title}</span>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Company/User section */}
      <div className="border-t p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            {initials || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-900">
              {firstName} {lastName}
            </p>

            <p className="truncate text-xs text-slate-500">
              {roleLabel}
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between px-3 pb-1">
          <span className="text-[10px] font-medium text-slate-400">
            BuildOps AI
          </span>

          <span className="text-[10px] text-slate-400">
            v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-200 bg-white lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile / Tablet Sidebar */}
      <div className="fixed left-3 top-3 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-slate-200 bg-white shadow-sm hover:bg-slate-50"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[280px] border-slate-200 bg-white p-0"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>
                Navigation
              </SheetTitle>
            </SheetHeader>

            <SidebarContent
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default Sidebar;