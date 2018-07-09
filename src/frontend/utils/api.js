import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const getFirefighters = () => axios.get(`${API_URL}/api/firefighters`);

export const addActiveFirefighter = id =>
  axios.post(`${API_URL}/api/firefighters/active/${id}`);

export const removeActiveFirefighter = id =>
  axios.delete(`${API_URL}/api/firefighters/active/${id}`);
