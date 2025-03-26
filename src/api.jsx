import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000"; // Django API URL

export const saveUserScore = async (name, score) => {
  return axios.post(`${API_BASE_URL}/users/`, { name, score });
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions/`);
  return response.data;
};
