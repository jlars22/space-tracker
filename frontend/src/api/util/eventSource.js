import { BACKEND_BASE_URL } from "config";

export function createEventSource(endpoint, messageHandler) {
  const eventSource = new EventSource(`${BACKEND_BASE_URL}${endpoint}`);

  eventSource.onopen = () => {
    console.log("Connection to server opened.");
  };

  eventSource.addEventListener("message", messageHandler);

  return eventSource;
}
