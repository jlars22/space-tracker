import axiosInstance from "./config/axiosConfig";

export const fetchHealth = () =>
  axiosInstance.get("/api/health").then((response) => response.data);
