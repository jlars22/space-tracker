import { eventSourceIssInformation } from "api/issInformation";
import { useEffect, useState } from "react";

const CACHE_KEY = "liveData";

const useLiveData = () => {
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  });

  useEffect(() => {
    const messageHandler = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    };

    const eventSource = eventSourceIssInformation(messageHandler);

    return () => {
      eventSource.removeEventListener("message", messageHandler);
      eventSource.close();
    };
  }, []);

  return data;
};

export default useLiveData;
