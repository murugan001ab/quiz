import axios from "axios";

// const API_BASE_URL = "https://4b7e-2409-40f4-1016-1319-ad64-b874-a409-9b93.ngrok-free.app";
const API_BASE_URL = "https://backend-quiz-xplp.onrender.com"
// // Django API URL



export const saveUserScore = async (name, score) => {
  return axios.post(`${API_BASE_URL}/users/`, { name, score });
};

export const GetResult = async () => {
  return axios.get(`${API_BASE_URL}/users/`);
};

export const fetchQuestions = async () => {
  const response = await axios.get(`${API_BASE_URL}/questions/`);
  return response.data;
};
