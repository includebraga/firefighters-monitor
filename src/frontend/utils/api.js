import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export const getFirefighters = () => axios.get(`${API_URL}/api/firefighters`);

export const addActiveFirefighter = id =>
  axios.put(`${API_URL}/api/firefighters/${id}`, { status: "active" });

const updateFirefighter = (id, state) =>
  axios.put(`${API_URL}/api/firefighters/${id}`, { status: state });

export const removeActiveFirefighter = id => updateFirefighter(id, "inactive");

export const addBusyFirefighter = id => updateFirefighter(id, "busy");
