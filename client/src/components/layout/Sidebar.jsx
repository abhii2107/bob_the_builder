import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ChevronRight } from "lucide-react";

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

  const visibleNavigation = navigation.filter(
    (item) => item.roles?.includes(userRole)
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
            word.charAt(0) +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    : "User";

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Brand */}
      <div className="flex h-[72px] items-center border-b border-[#e7e5df] px-5">
        <div className="flex items-center gap-3">
          {/* Logo */}
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#1c1d1f] text-sm font-bold text-white">
            B
          </div>

          <div className="leading-tight">
            <h1 className="text-[15px] font-semibold tracking-tight text-[#191a1c]">
              BuildOps
            </h1>

            <p className="mt-0.5 text-[11px] font-medium text-[#77766f]">
              Construction ERP
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aaa79f]">
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
                    "group relative flex items-center gap-3 rounded-md px-3 py-2.5",
                    "text-sm font-medium",
                    "transition-all duration-150",
                    isActive
                      ? "bg-[#f6ecd6] text-[#191a1c]"
                      : "text-[#77766f] hover:bg-[#f5f4f0] hover:text-[#191a1c]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[#c9952e]" />
                    )}

                    <Icon
                      className={[
                        "h-[18px] w-[18px] shrink-0 transition-colors duration-150",
                        isActive
                          ? "text-[#c9952e]"
                          : "text-[#aaa79f] group-hover:text-[#5f5e59]",
                      ].join(" ")}
                    />

                    <span className="flex-1">
                      {item.title}
                    </span>

                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 text-[#c9952e]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User section */}
      <div className="border-t border-[#e7e5df] p-3">
        <div className="flex items-center gap-3 rounded-md px-3 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1c1d1f] text-xs font-semibold text-white">
            {initials || "U"}
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#191a1c]">
              {firstName} {lastName}
            </p>

            <p className="truncate text-xs text-[#77766f]">
              {roleLabel}
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between px-3 pb-1">
          <span className="text-[10px] font-medium text-[#aaa79f]">
            BuildOps AI
          </span>

          <span className="text-[10px] text-[#aaa79f]">
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
      <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-[#e7e5df] bg-white lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile / Tablet Sidebar */}
      <div className="fixed left-3 top-3 z-50 lg:hidden">
        <Sheet
          open={open}
          onOpenChange={setOpen}
        >
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 border-[#dedcd4] bg-white text-[#1c1d1f] shadow-sm hover:bg-[#f5f4f0]"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[280px] border-[#e7e5df] bg-white p-0"
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