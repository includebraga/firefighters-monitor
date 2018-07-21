import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const getFirefighters = () => axios.get(`${API_URL}/api/firefighters`);

export const addActiveFirefighter = id =>
  axios.put(`${API_URL}/api/firefighters/${id}`, { status: "active" });

export const removeActiveFirefighter = id =>
  axios.put(`${API_URL}/api/firefighters/${id}`, { status: "inactive" });
