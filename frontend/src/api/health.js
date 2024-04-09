import axiosInstance from "./config/axiosConfig";

export async function fetchHealth() {
  try {
    const response = await axiosInstance.get("/api/health");
    return response.data;
  } catch (error) {
    console.error("Error getting health:", error);
    throw error;
  }
}
