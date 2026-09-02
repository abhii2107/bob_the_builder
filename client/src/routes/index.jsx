import {
  lazy,
  Suspense,
} from "react";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import LoginPage from "@/features/auth/pages/LoginPage";

import ProtectedRoute from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

const DashboardPage = lazy(() =>
  import("@/features/dashboard/pages/DashboardPage")
);
const UsersPage = lazy(() =>
  import("@/features/users/pages/UsersPage")
);
const ProjectsPage = lazy(() =>
  import("@/features/projects/pages/ProjectPage")
);
const ProjectDetailsPage = lazy(() =>
  import("@/features/projects/pages/ProjectDetailsPage")
);
const AttendancePage = lazy(() =>
  import("@/features/attendance/pages/AttendancePage")
);
const InventoryPage = lazy(() =>
  import("@/features/inventory/pages/InventoryPage")
);
const ReportsPage = lazy(() =>
  import("@/features/reports/pages/ReportPage")
);
const SettingsPage = lazy(() =>
  import("@/features/settings/SettingPage")
);
const AIChatPage = lazy(() =>
  import("@/features/ai/pages/AIChatPage")
);

function RouteLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="flex items-center gap-3 rounded-xl border border-[#D5DDD8] bg-[#E7ECE8] px-4 py-3 shadow-[0_8px_22px_rgba(25,26,28,0.035)]">
        <span className="h-2 w-2 animate-pulse rounded-full bg-[#C9952E]" />
        <span className="text-sm font-medium text-[#77736B]">
          Loading workspace...
        </span>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoading />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              {/* Root */}
              <Route
                path="/"
                element={<Navigate to="/dashboard" replace />}
              />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<DashboardPage />}
              />

              {/* Employees */}
              <Route
                element={
                  <RoleProtectedRoute
                    roles={["OWNER", "PROJECT_MANAGER"]}
                  />
                }
              >
                <Route path="/users" element={<UsersPage />} />
              </Route>

              {/* Projects */}
              <Route
                element={
                  <RoleProtectedRoute
                    roles={[
                      "OWNER",
                      "PROJECT_MANAGER",
                      "SITE_ENGINEER",
                    ]}
                  />
                }
              >
                <Route
                  path="/projects"
                  element={<ProjectsPage />}
                />

                <Route
                  path="/projects/:id"
                  element={<ProjectDetailsPage />}
                />

                <Route
                  path="/attendance"
                  element={<AttendancePage />}
                />

                <Route
                  path="/inventory"
                  element={<InventoryPage />}
                />
              </Route>

              {/* Reports */}
              <Route
                element={
                  <RoleProtectedRoute
                    roles={["OWNER", "PROJECT_MANAGER"]}
                  />
                }
              >
                <Route
                  path="/reports"
                  element={<ReportsPage />}
                />
              </Route>

              {/* Settings */}
              <Route
                element={
                  <RoleProtectedRoute roles={["OWNER"]} />
                }
              >
                <Route
                  path="/settings"
                  element={<SettingsPage />}
                />
              </Route>

              {/* BuildOps AI */}
              <Route
                element={
                  <RoleProtectedRoute
                    roles={[
                      "OWNER",
                      "PROJECT_MANAGER",
                      "SITE_ENGINEER",
                      "STORE_MANAGER",
                    ]}
                  />
                }
              >
                <Route
                  path="/ai"
                  element={<AIChatPage />}
                />
              </Route>
            </Route>
          </Route>

          {/* Unknown route */}
          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
