import api from "@/api/axios";

export const createAssignment = async (data) => {
  const response = await api.post(
    "/assignments",
    data
  );

  return response.data;
};

export const getProjectAssignments = async (projectId) => {
  const response = await api.get(
    `/assignments/project/${projectId}`
  );

  return response.data;
};

export const getEmployeeAssignments = async (employeeId) => {
  const response = await api.get(
    `/assignments/employee/${employeeId}`
  );

  return response.data;
};

export const removeAssignment = async (assignmentId) => {
  const response = await api.patch(
    `/assignments/${assignmentId}/remove`
  );

  return response.data;
};