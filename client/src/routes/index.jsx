import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";

import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import UsersPage from "@/features/users/pages/UsersPage";
import ProjectsPage from "@/features/projects/pages/ProjectPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";
import AttendancePage from "@/features/attendance/pages/AttendancePage";
import InventoryPage from "@/features/inventory/pages/InventoryPage";
import ReportsPage from "@/features/reports/pages/ReportPage";
import SettingsPage from "@/features/settings/SettingPage";
import AIChatPage from "@/features/ai/pages/AIChatPage";

import ProtectedRoute from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Protected */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>

            {/* Root */}
            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
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
                  roles={[
                    "OWNER",
                    "PROJECT_MANAGER",
                  ]}
                />
              }
            >
              <Route
                path="/users"
                element={<UsersPage />}
              />
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
                  roles={[
                    "OWNER",
                    "PROJECT_MANAGER",
                  ]}
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
                <RoleProtectedRoute
                  roles={["OWNER"]}
                />
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
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;