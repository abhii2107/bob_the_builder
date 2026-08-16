import api from "@/api/axios";

export const getUsers = async () => {
  const response = await api.get("/users");

  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/users", data);

  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}`, data);

  return response.data;
};

export const updateUserStatus = async (id, isActive) => {
  const response = await api.patch(
    `/users/${id}/status`,
    { isActive }
  );

  return response.data;
};