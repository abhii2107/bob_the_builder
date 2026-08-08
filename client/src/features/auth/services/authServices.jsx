import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

export const loginUser = async (credentials) => {
  const response = await axios.post(
    `${API_URL}/auth/login`,
    credentials
  );

  return response.data;
};