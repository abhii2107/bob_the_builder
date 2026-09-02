import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-[#F7F6F2]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main application */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Top navigation */}
          <Topbar />

          {/* Page content */}
          <main className="min-w-0 flex-1 overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1680px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
              <div className="min-w-0">
                <Outlet />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;