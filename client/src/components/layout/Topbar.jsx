import { Bell, LogOut, Search, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { logout, useAuthStore } from "@/store/authStore";

function Topbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const firstName = user?.firstName || "Abhishek";
  const lastName = user?.lastName || "Bhatia";

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white px-4 md:px-6">
      {/* Left */}
      <div className="flex min-w-0 flex-1 items-center">
        {/* Mobile logo */}
        <div className="ml-12 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
            B
          </div>

          <span className="hidden text-sm font-semibold text-slate-900 sm:block">
            BuildOps
          </span>
        </div>

        {/* Search */}
        <div className="relative ml-4 hidden w-full max-w-md md:block lg:ml-0">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            placeholder="Search projects, employees..."
            aria-label="Search"
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Mobile search */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
        </Button>

        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg p-1.5 outline-none transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-blue-100"
              aria-label="Open user menu"
            >
              <Avatar className="h-8 w-8 border border-slate-200">
                <AvatarFallback className="bg-slate-900 text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left leading-tight lg:block">
                <p className="max-w-[130px] truncate text-sm font-medium text-slate-900">
                  {firstName} {lastName}
                </p>

                <p className="text-[11px] font-medium text-slate-500">
                  {user?.role || "Owner"}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="font-medium">
                  {firstName} {lastName}
                </span>

                <span className="mt-1 text-xs font-normal text-slate-500">
                  {user?.email || "abhi@example.com"}
                </span>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/settings")}
            >
              <UserRound className="mr-2 h-4 w-4" />
              Profile & Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 focus:text-red-600"
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