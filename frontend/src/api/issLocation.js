import { BACKEND_BASE_URL } from "config";
import axiosInstance from "./config/axiosConfig";

function createEventSource(endpoint, messageHandler) {
  const eventSource = new EventSource(`${BACKEND_BASE_URL}${endpoint}`);

  eventSource.onopen = () => {
    console.log("Connection to server opened.");
  };

  eventSource.addEventListener("message", messageHandler);

  return eventSource;
}

export const eventSourceLive = (messageHandler) =>
  createEventSource("/api/iss-location/subscribe/live", messageHandler);
export const eventSourceSaved = (messageHandler) =>
  createEventSource("/api/iss-location/subscribe/saved", messageHandler);

export const fetchSavedISSLocation = () =>
  axiosInstance
    .get("/api/iss-location/saved")
    .then((response) => response.data);
