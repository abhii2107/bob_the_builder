import { useQuery } from "@tanstack/react-query";

import { getDashboardOverview } from "../services/dashboardService";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: getDashboardOverview,
    staleTime: 30 * 1000,
  });
}