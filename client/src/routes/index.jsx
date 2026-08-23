import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppLayout from "@/components/layout/AppLayout";
import UsersPage from "@/features/users/pages/UsersPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import DashboardPage from "@/features/dashboard/pages/DashboardPage";
import ProjectsPage from "@/features/projects/pages/ProjectPage";
import ProjectDetailsPage from "@/features/projects/pages/ProjectDetailsPage";
import ProtectedRoute from "./ProtectedRoutes";
import AttendancePage from "@/features/attendance/pages/AttendancePage";
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

            {/* Projects */}
            <Route
              path="/projects"
              element={<ProjectsPage />}
            />
          </Route>

          <Route
            path="/attendance"
            element={<AttendancePage />}
          />

          {/* Project Details */}
          <Route
            path="/projects/:id"
            element={<ProjectDetailsPage />}
          />
        </Route>
        {/* users */}
        <Route
          path="/users"
          element={<UsersPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;