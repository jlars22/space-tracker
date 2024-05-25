import { fetchSavedAstronauts } from "api/astronauts";
import { eventSourceIssInformation } from "api/issInformation";
import { fetchSavedISSLocation } from "api/issLocation";
import { useEffect, useState } from "react";

export const useHistoricalDataAndSubscribe = () => {
  const [historicalData, setHistoricalData] = useState([]);
  const [astronautData, setAstronautData] = useState([]);

  useEffect(() => {
    fetchSavedISSLocation()
      .then((data) => setHistoricalData(data))
      .catch((error) => console.error("Error:", error));

    fetchSavedAstronauts()
      .then((data) => setAstronautData(data))
      .catch((error) => console.error("Error:", error));

    const messageHandler = (event) => {
      const newData = JSON.parse(event.data);
      setHistoricalData((prevData) => [...prevData, newData]);
      setAstronautData((prevData) => [...prevData, ...newData.astronauts]);
    };

    const eventSource = eventSourceIssInformation(messageHandler);

    return () => {
      eventSource.removeEventListener("message", messageHandler);
      eventSource.close();
    };
  }, []);

  return { historicalData, astronautData };
};
