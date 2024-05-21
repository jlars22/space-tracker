import axiosInstance from "./config/axiosConfig";

export const fetchSavedAstronauts = () =>
  axiosInstance
    .get("/api/astronaut-on-board")
    .then((response) => response.data);
