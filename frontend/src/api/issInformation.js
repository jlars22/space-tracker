import { createEventSource } from "./util/eventSource";

export const eventSourceIssInformation = (messageHandler) =>
  createEventSource("/api/iss-information/stream", messageHandler);
