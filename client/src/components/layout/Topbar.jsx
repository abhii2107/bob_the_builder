import { Bell, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function Topbar() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm md:px-6">
      {/* Left section */}
      <div className="flex min-w-0 flex-1 items-center">
        {/* Mobile logo */}
        <div className="ml-12 flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow-sm">
            B
          </div>

          <span className="hidden text-sm font-semibold text-slate-900 sm:block">
            BuildOps
          </span>
        </div>

        {/* Search */}
        <div className="relative ml-4 hidden w-full max-w-md md:block lg:ml-0">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />

          <input
            type="search"
            placeholder="Search projects, employees..."
            aria-label="Search"
            className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />

          {/* Keyboard shortcut */}
          <span className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:block">
            ⌘ K
          </span>
        </div>
      </div>

      {/* Right section */}
      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 md:hidden"
          aria-label="Search"
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell className="h-[18px] w-[18px]" />

          {/* Notification indicator */}
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
        </Button>

        {/* Divider */}
        <div className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />

        {/* Profile */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg p-1.5 transition-colors duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-100"
          aria-label="Open profile menu"
        >
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarFallback className="bg-slate-900 text-xs font-semibold text-white">
              AB
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left leading-tight lg:block">
            <p className="max-w-[120px] truncate text-sm font-medium text-slate-900">
              Abhishek Bhatia
            </p>

            <p className="text-[11px] font-medium text-slate-500">
              Owner
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Topbar;