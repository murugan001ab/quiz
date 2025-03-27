import axios from "axios";

const API_BASE_URL = "https://de52-2409-40f4-10f4-7292-4780-38e8-e29a-b73e.ngrok-free.app"; // Django API URL

export const saveUserScore = async (name, score) => {
  return axios.post(`${API_BASE_URL}/users/`, { name, score });
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions/`);
  return response.data;
};
