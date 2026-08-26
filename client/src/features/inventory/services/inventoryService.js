import api from "@/api/axios";

export const getInventory = async (params = {}) => {
  const response = await api.get("/inventory", {
    params,
  });

  return response.data;
};

export const createInventory = async (data) => {
  const response = await api.post("/inventory", data);

  return response.data;
};

export const stockIn = async (id, data) => {
  const response = await api.post(
    `/inventory/${id}/stock-in`,
    data
  );

  return response.data;
};

export const stockOut = async (id, data) => {
  const response = await api.post(
    `/inventory/${id}/stock-out`,
    data
  );

  return response.data;
};

export const getInventoryTransactions = async (id) => {
  const response = await api.get(
    `/inventory/${id}/transactions`
  );

  return response.data;
};