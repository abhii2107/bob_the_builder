import { useQuery } from "@tanstack/react-query";

import {
  getAttendanceReport,
  getInventoryReport,
  getInventoryTransactionReport,
  getProjectReport,
} from "../services/reportService";

const reportQueryOptions = {
  staleTime: 30 * 1000,
};

export function useAttendanceReport() {
  return useQuery({
    queryKey: ["reports", "attendance"],
    queryFn: getAttendanceReport,
    ...reportQueryOptions,
  });
}

export function useInventoryReport() {
  return useQuery({
    queryKey: ["reports", "inventory"],
    queryFn: getInventoryReport,
    ...reportQueryOptions,
  });
}

export function useInventoryTransactionReport() {
  return useQuery({
    queryKey: ["reports", "inventory-transactions"],
    queryFn: getInventoryTransactionReport,
    ...reportQueryOptions,
  });
}

export function useProjectReport() {
  return useQuery({
    queryKey: ["reports", "projects"],
    queryFn: getProjectReport,
    ...reportQueryOptions,
  });
}