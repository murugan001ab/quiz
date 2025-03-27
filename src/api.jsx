import axios from "axios";

const API_BASE_URL = "https://58b5-2409-40f4-1016-1319-ad64-b874-a409-9b93.ngrok-free.app";

// Include headers in all requests to bypass ngrok warning
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export const saveUserScore = async (name, score) => {
  return axiosInstance.post(`/users/`, { name, score });
};

export const fetchQuestions = async () => {
  const response = await axiosInstance.get(`/questions/`);
  return response.data;
};
