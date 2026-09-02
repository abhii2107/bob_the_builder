import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ChevronRight, Sparkles } from "lucide-react";
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

  const initials =
    `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();

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
    <div className="flex h-full flex-col bg-[#F7F6F2]">
      <div className="relative flex h-[78px] items-center border-b border-[#DCE2DE] px-5">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D8DED9] to-transparent" />

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1C1D1F] text-sm font-bold text-white shadow-[0_6px_14px_rgba(25,26,28,0.12)]">
            B
          </div>

          <div className="leading-tight">
            <h1 className="text-[15px] font-semibold tracking-[-0.01em] text-[#191A1C]">
              BuildOps
            </h1>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#A49F95]">
              Construction ERP
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-6">
        <div className="mb-3 flex items-center justify-between px-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#A49F95]">
            Workspace
          </p>
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9952E]" />
        </div>

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
                    "text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-[#E7E9D7] text-[#191A1C] shadow-[inset_0_0_0_1px_rgba(126,132,94,0.12)]"
                      : "text-[#77736B] hover:bg-white/75 hover:text-[#191A1C]",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-[#C9952E]" />
                    )}

                    <span
                      className={
                        isActive
                          ? "flex h-7 w-7 items-center justify-center rounded-md bg-white/75 text-[#7E845E]"
                          : "flex h-7 w-7 items-center justify-center rounded-md text-[#A49F95] transition-colors group-hover:bg-white/60 group-hover:text-[#625E57]"
                      }
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <span className="flex-1">{item.title}</span>

                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 text-[#C9952E]" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-[#DCE2DE] p-3">
        <div className="rounded-xl border border-[#D9E1DC] bg-white/70 p-3 shadow-[0_6px_18px_rgba(25,26,28,0.025)]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1C1D1F] text-xs font-semibold text-white">
              {initials || "U"}
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#191A1C]">
                {firstName} {lastName}
              </p>
              <p className="truncate text-[11px] font-medium text-[#8E8A81]">
                {roleLabel}
              </p>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#E6E9E5] pt-3">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-[#C9952E]" />
              <span className="text-[10px] font-semibold text-[#77736B]">
                BuildOps AI
              </span>
            </div>

            <span className="text-[10px] font-medium text-[#B0ACA3]">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="hidden h-screen w-[264px] shrink-0 flex-col border-r border-[#DCE2DE] bg-[#F7F6F2] lg:flex">
        <SidebarContent />
      </aside>

      <div className="fixed left-3 top-3 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-lg border-[#D8DED9] bg-white text-[#1C1D1F] shadow-[0_8px_20px_rgba(25,26,28,0.07)] hover:bg-[#F2F3EF]"
              aria-label="Open navigation"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-[282px] border-[#DCE2DE] bg-[#F7F6F2] p-0"
          >
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>

            <SidebarContent onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

export default Sidebar;
