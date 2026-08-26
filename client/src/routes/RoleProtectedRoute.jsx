import { Navigate, Outlet } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";

function RoleProtectedRoute({ roles }) {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default RoleProtectedRoute;