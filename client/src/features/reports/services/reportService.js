import api from "@/api/axios";

const getReport = async (path) => {
  const response = await api.get(`/reports/${path}`);

  return response.data;
};

export const getAttendanceReport = () =>
  getReport("attendance");

export const getInventoryReport = () =>
  getReport("inventory");

export const getInventoryTransactionReport = () =>
  getReport("inventory-transactions");

export const getProjectReport = () =>
  getReport("projects");