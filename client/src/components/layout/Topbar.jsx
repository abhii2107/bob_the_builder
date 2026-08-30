import {
  Bell,
  LogOut,
  Search,
  UserRound,
  Sparkles,
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
    <header className="sticky top-0 z-40 flex h-[68px] shrink-0 items-center border-b border-[#e7e5df] bg-white/95 px-4 backdrop-blur-sm sm:px-6">
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center">
        {/* Mobile brand */}
        <div className="ml-12 flex items-center gap-2.5 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#1c1d1f] text-xs font-bold text-white">
            B
          </div>

          <span className="hidden text-sm font-semibold tracking-tight text-[#191a1c] sm:block">
            BuildOps
          </span>
        </div>

        {/* Search */}
        <div className="relative ml-4 hidden w-full max-w-[420px] md:block lg:ml-0">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#aaa79f]" />

          <input
            type="search"
            placeholder="Search projects, employees..."
            aria-label="Search"
            className="h-10 w-full rounded-md border border-[#e2e0d9] bg-[#f7f6f2] pl-10 pr-4 text-sm text-[#191a1c] outline-none placeholder:text-[#aaa79f] transition-all duration-150 focus:border-[#c9952e] focus:bg-white focus:ring-2 focus:ring-[#f6ecd6]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
        {/* Mobile search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md text-[#77766f] hover:bg-[#f5f4f0] hover:text-[#191a1c] md:hidden"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* AI shortcut */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/ai")}
          className="h-9 w-9 rounded-md text-[#77766f] hover:bg-[#f6ecd6] hover:text-[#191a1c]"
          aria-label="BuildOps AI"
        >
          <Sparkles className="h-[17px] w-[17px]" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-md text-[#77766f] hover:bg-[#f5f4f0] hover:text-[#191a1c]"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#c9952e] ring-2 ring-white" />
        </Button>

        <div className="mx-1 hidden h-6 w-px bg-[#e7e5df] sm:block" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-md p-1.5 outline-none transition-colors hover:bg-[#f5f4f0] focus:ring-2 focus:ring-[#f6ecd6]"
              aria-label="Open user menu"
            >
              <Avatar className="h-8 w-8 border border-[#dedcd4]">
                <AvatarFallback className="bg-[#1c1d1f] text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left leading-tight lg:block">
                <p className="max-w-[140px] truncate text-sm font-medium text-[#191a1c]">
                  {firstName} {lastName}
                </p>

                <p className="mt-0.5 text-[11px] font-medium text-[#77766f]">
                  {roleLabel}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-60 border-[#e7e5df] bg-white p-1.5 shadow-lg"
          >
            <DropdownMenuLabel className="px-3 py-2.5">
              <div className="flex flex-col">
                <span className="font-medium text-[#191a1c]">
                  {firstName} {lastName}
                </span>

                <span className="mt-1 truncate text-xs font-normal text-[#77766f]">
                  {user?.email || "No email available"}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-[#e7e5df]" />

            <DropdownMenuItem
              onClick={() =>
                navigate("/settings")
              }
              className="cursor-pointer rounded-md text-[#55544f] focus:bg-[#f6ecd6] focus:text-[#191a1c]"
            >
              <UserRound className="mr-2 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                navigate("/ai")
              }
              className="cursor-pointer rounded-md text-[#55544f] focus:bg-[#f6ecd6] focus:text-[#191a1c]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              BuildOps AI
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-[#e7e5df]" />

            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer rounded-md text-[#a9605b] focus:bg-[#f4e8e6] focus:text-[#a9605b]"
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