import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import LiveDataTable from "./LiveDataTable";

import RouteMap from "./RouteMap";
import { eventSourceIssInformation } from "api/issInformation";

const CACHE_KEY = "liveData";

export default function LivePage() {
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

  const route = data ? [[data.latitude, data.longitude]] : [];

  return (
    <Card className="m-4 bg-gray-900 p-6 shadow-xl">
      <div className="mb-2 text-center">
        <Typography color="white" variant="h2" className="font-bold text-white">
          Live Data Tracking
        </Typography>
        <Typography color="white" variant="h5" className="text-white">
          Last update:{" "}
          {data &&
            `${new Date(data.timestamp).toLocaleDateString()} ${new Date(data.timestamp).toLocaleTimeString()}`}
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-center">
        <RouteMap route={route} />
        <LiveDataTable data={data} />
      </div>
    </Card>
  );
}
