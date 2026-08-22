import api from "@/api/axios";

export const createAttendance = async (data) => {
  const response = await api.post(
    "/attendance",
    data
  );

  return response.data;
};

export const getProjectAttendance = async (
  projectId
) => {
  const response = await api.get(
    `/attendance/project/${projectId}`
  );

  return response.data;
};

export const getEmployeeAttendance = async (
  employeeId
) => {
  const response = await api.get(
    `/attendance/employee/${employeeId}`
  );

  return response.data;
};

export const updateAttendance = async (
  id,
  data
) => {
  const response = await api.patch(
    `/attendance/${id}`,
    data
  );

  return response.data;
};

export const deleteAttendance = async (id) => {
  const response = await api.delete(
    `/attendance/${id}`
  );

  return response.data;
};