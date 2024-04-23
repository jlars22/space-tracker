import axios from "axios";
import { BACKEND_BASE_URL } from "config";

const axiosInstance = axios.create({
  baseURL: BACKEND_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Request failed:", error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
