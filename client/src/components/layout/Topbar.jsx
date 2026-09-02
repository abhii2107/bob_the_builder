import {
  Bell,
  LogOut,
  Search,
  UserRound,
  Sparkles,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  logout,
  useAuthStore,
} from "@/store/authStore";

function Topbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });
  };

  const firstName =
    user?.firstName || "User";

  const lastName =
    user?.lastName || "";

  const initials =
    `${firstName.charAt(0)}${lastName.charAt(0)}`
      .toUpperCase();

  const roleLabel = user?.role
    ? user.role
        .split("_")
        .map(
          (word) =>
            word.charAt(0) +
            word.slice(1).toLowerCase()
        )
        .join(" ")
    : "User";

  return (
    <header className="sticky top-0 z-40 flex h-[68px] shrink-0 items-center border-b border-[#DCE2DE] bg-[#F7F6F2]/92 px-4 backdrop-blur-xl sm:px-6">
      {/* Soft top highlight */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D8DED9] to-transparent" />

      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center">
        {/* Mobile brand */}
        <div className="ml-12 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1C1D1F] text-xs font-bold text-white shadow-[0_5px_12px_rgba(25,26,28,0.10)]">
            B
          </div>

          <div className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-tight text-[#191A1C]">
              BuildOps
            </span>

            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#A49F95]">
              Construction ERP
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="relative ml-4 hidden w-full max-w-[440px] md:block lg:ml-0">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8E8A81]" />

          <input
            type="search"
            placeholder="Search projects, employees..."
            aria-label="Search"
            className="h-10 w-full rounded-lg border border-[#D8DED9] bg-white/75 pl-10 pr-4 text-sm text-[#191A1C] outline-none shadow-[0_4px_14px_rgba(25,26,28,0.025)] placeholder:text-[#AAA69D] transition-all duration-150 focus:border-[#C9952E] focus:bg-white focus:ring-2 focus:ring-[#F5EBD5]"
          />
        </div>

        {/* Mobile page utility */}
        <div className="ml-3 hidden items-center gap-2 sm:flex md:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5D7D68]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#A49F95]">
            Workspace
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Mobile search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-[#77736B] hover:bg-white/80 hover:text-[#191A1C] md:hidden"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* AI shortcut */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/ai")}
          className="group h-9 w-9 rounded-lg text-[#77736B] hover:bg-[#F5EBD5] hover:text-[#191A1C]"
          aria-label="BuildOps AI"
        >
          <Sparkles className="h-[17px] w-[17px] transition-transform duration-150 group-hover:scale-105" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="group relative h-9 w-9 rounded-lg text-[#77736B] hover:bg-white/80 hover:text-[#191A1C]"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#C9952E] ring-2 ring-[#F7F6F2]" />
        </Button>

        <div className="mx-1 hidden h-7 w-px bg-[#DCE2DE] sm:block" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="group flex items-center gap-2 rounded-lg p-1.5 outline-none transition-all duration-150 hover:bg-white/75 focus:ring-2 focus:ring-[#F5EBD5]"
              aria-label="Open user menu"
            >
              <Avatar className="h-8 w-8 border border-[#D5DDD8] shadow-[0_3px_10px_rgba(25,26,28,0.045)]">
                <AvatarFallback className="bg-[#1C1D1F] text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left leading-tight lg:block">
                <p className="max-w-[145px] truncate text-sm font-semibold text-[#191A1C]">
                  {firstName} {lastName}
                </p>

                <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-[0.08em] text-[#8E8A81]">
                  {roleLabel}
                </p>
              </div>

              <span className="hidden h-1.5 w-1.5 rounded-full bg-[#5D7D68] lg:block" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-60 rounded-xl border-[#DCE2DE] bg-white p-1.5 shadow-[0_18px_40px_rgba(25,26,28,0.11)]"
          >
            <DropdownMenuLabel className="px-3 py-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-[#D8DED9]">
                  <AvatarFallback className="bg-[#1C1D1F] text-xs font-semibold text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <span className="block truncate font-semibold text-[#191A1C]">
                    {firstName} {lastName}
                  </span>

                  <span className="mt-0.5 block truncate text-xs font-normal text-[#77736B]">
                    {user?.email ||
                      "No email available"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#E4E8E4]" />

            <DropdownMenuItem
              onClick={() =>
                navigate("/settings")
              }
              className="cursor-pointer rounded-lg px-3 py-2.5 text-[#55524D] focus:bg-[#F0F2ED] focus:text-[#191A1C]"
            >
              <Settings className="mr-2 h-4 w-4 text-[#7E845E]" />
              Profile & Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                navigate("/ai")
              }
              className="cursor-pointer rounded-lg px-3 py-2.5 text-[#55524D] focus:bg-[#F5EBD5] focus:text-[#191A1C]"
            >
              <Sparkles className="mr-2 h-4 w-4 text-[#C9952E]" />
              BuildOps AI
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#E4E8E4]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer rounded-lg px-3 py-2.5 text-[#A9605B] focus:bg-[#F4E8E6] focus:text-[#8F4C47]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Topbar;
