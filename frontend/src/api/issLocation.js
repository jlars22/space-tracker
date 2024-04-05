import axiosInstance from "./config/axiosConfig";

function createEventSource(endpoint) {
  const eventSource = new EventSource(
    `${process.env.REACT_APP_BACKEND_BASE_URL}${endpoint}`,
  );

  eventSource.onopen = () => {
    console.log("Connection to server opened.");
  };

  eventSource.onerror = (error) => {
    console.error("Error:", error);
    eventSource.close();
  };

  return eventSource;
}

export const eventSourceLive = createEventSource(
  "/api/iss-location/subscribe/live",
);
export const eventSourceSaved = createEventSource(
  "/api/iss-location/subscribe/saved",
);

export function fetchSavedISSLocation() {
  return axiosInstance
    .get("/api/iss-location/saved")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching saved ISS location:", error);
      throw error;
    });
}
