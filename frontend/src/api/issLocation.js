import axiosInstance from "./config/axiosConfig";

function createEventSource(endpoint, messageHandler) {
  let eventSource;

  const connect = () => {
    eventSource = new EventSource(
      `${process.env.REACT_APP_BACKEND_BASE_URL}${endpoint}`,
    );

    eventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    eventSource.onerror = (error) => {
      console.error("Error:", error);
      eventSource.close();
      setTimeout(connect, 5000);
    };

    eventSource.addEventListener("message", messageHandler);
  };

  connect();

  return eventSource;
}

export const eventSourceLive = (messageHandler) =>
  createEventSource("/api/iss-location/subscribe/live", messageHandler);
export const eventSourceSaved = (messageHandler) =>
  createEventSource("/api/iss-location/subscribe/saved", messageHandler);

export function fetchSavedISSLocation() {
  return axiosInstance
    .get("/api/iss-location/saved")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching saved ISS location:", error);
      throw error;
    });
}
