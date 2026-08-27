import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import SettingsPage from "@/features/settings/SettingPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import UsersPage from "@/features/users/pages/UsersPage";

import InventoryPage from "@/features/inventory/pages/InventoryPage";

import ProjectsPage from "@/features/projects/pages/ProjectPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";

import AttendancePage from "@/features/attendance/pages/AttendancePage";
import ReportsPage from "@/features/reports/pages/ReportPage";
import ProtectedRoute from "./ProtectedRoutes";
import RoleProtectedRoute from "./RoleProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            Public Routes
        ========================== */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* =========================
            Protected Routes
        ========================== */}

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

            {/* =========================
                Dashboard
                All authenticated users
            ========================== */}

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            {/* =========================
                Employees
                OWNER + PROJECT_MANAGER
            ========================== */}

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

            {/* =========================
                Projects
                OWNER + PROJECT_MANAGER + SITE_ENGINEER
            ========================== */}

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

              {/* Inventory */}
              <Route
                path="/inventory"
                element={<InventoryPage />}
              />

              {/* Attendance */}
              <Route
                path="/attendance"
                element={<AttendancePage />}
              />

              {/* Reports */}
              <Route
                path="/reports"
                element={<ReportsPage />}
              />

              <Route
                path="/settings"
                element={<SettingsPage />}
              />
            </Route>
          </Route>
        </Route>

        {/* =========================
            Unknown Routes
        ========================== */}

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