import api from "@/api/axios";

export const chatWithAI = async (
  message,
  conversation = []
) => {
  const response = await api.post(
    "/ai/chat",
    {
      message,
      conversation,
    }
  );

  return response.data;
};