import { useAuthStore } from "@/store/authStore";
import ProjectManagerDashboard from "../components/ProjectManagerDashboard";
import OwnerDashboard from "../components/OwnerDashboard";

function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "OWNER":
      return <OwnerDashboard />;

    case "PROJECT_MANAGER":
      return <ProjectManagerDashboard />;

    case "SITE_ENGINEER":
      return (
        <div className="p-6">
          Site Engineer Dashboard coming next.
        </div>
      );

    default:
      return (
        <div className="p-6">
          You don't have access to a dashboard.
        </div>
      );
  }
}

export default DashboardPage;