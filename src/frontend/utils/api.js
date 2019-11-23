import axios from "axios";

const API_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "";

export { API_URL };

export const getFirefighters = () => axios.get(`${API_URL}/api/firefighters`);

export const addActiveFirefighter = id =>
  axios.put(`${API_URL}/api/firefighters/${id}`, { status: "active" });

const updateFirefighterStatus = (id, state) => {
  console.log(
    "%c==>",
    "color: green; background: yellow; font-size: 20px",
    "here"
  );

  return axios.put(`${API_URL}/api/firefighters/${id}`, { status: state });
};

export const removeActiveFirefighter = id =>
  updateFirefighterStatus(id, "inactive");

export const addBusyFirefighter = id => updateFirefighterStatus(id, "busy");

export const updateFirefighterDuty = (id, isOnDuty) =>
  axios.put(`${API_URL}/api/firefighters/${id}`, {
    isOnDuty
  });
