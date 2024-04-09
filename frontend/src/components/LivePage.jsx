import { Card, Typography, Spinner } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import LiveDataTable from "./LiveDataTable";
import { eventSourceLive } from "api/issLocation";
import RouteMap from "./RouteMap";

const CACHE_KEY = "liveData";

export default function LivePage() {
  const [data, setData] = useState(() => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    return cachedData ? JSON.parse(cachedData) : null;
  });
  const [status, setStatus] = useState("connecting");

  useEffect(() => {
    const messageHandler = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
      localStorage.setItem(CACHE_KEY, JSON.stringify(newData));
    };

    const eventSource = eventSourceLive(messageHandler);

    return () => {
      eventSource.removeEventListener("message", messageHandler);
      eventSource.close();
    };
  }, []);

  const route = data ? [[data.latitude, data.longitude]] : [];

  return (
    <Card className="m-4 bg-gray-900">
      <div className="flex flex-col items-center p-4 text-center">
        <div className="flex items-center">
          <Typography color="white" variant="h2" className="text-white">
            Live data
          </Typography>
        </div>
        <Typography color="white" variant="h5" className="text-white">
          Last update <br />
          {data &&
            `${new Date(data.timestamp).toLocaleDateString()} ${new Date(data.timestamp).toLocaleTimeString()}`}
        </Typography>
      </div>
      <div className="mb-6 flex flex-col items-center justify-center space-y-10">
        <RouteMap route={route} />
        <LiveDataTable data={data} />
      </div>
    </Card>
  );
}
