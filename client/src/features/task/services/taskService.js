import api from "@/api/axios";

export const createTask = async (data) => {
  const response = await api.post("/tasks", data);

  return response.data;
};

export const getProjectTasks = async (projectId) => {
  const response = await api.get(
    `/tasks/project/${projectId}`
  );

  return response.data;
};

export const getTaskById = async (taskId) => {
  const response = await api.get(
    `/tasks/${taskId}`
  );

  return response.data;
};