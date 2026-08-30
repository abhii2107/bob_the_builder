import api from "@/api/axios";

export const chatWithAI = async (message) => {
  const response = await api.post("/ai/chat", {
    message,
  });

  return response.data;
};
