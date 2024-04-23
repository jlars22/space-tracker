import axiosInstance from "./config/axiosConfig";

export const fetchSavedISSLocation = () =>
  axiosInstance.get("/api/iss-location").then((response) => response.data);
