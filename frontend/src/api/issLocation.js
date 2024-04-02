const eventSource = new EventSource(
  `${process.env.REACT_APP_BACKEND_BASE_URL}/api/iss-location/subscribe`,
);

eventSource.onopen = () => {
  console.log("Connection to server opened.");
};

eventSource.onerror = (error) => {
  console.error("Error:", error);
  eventSource.close();
};

export default eventSource;
