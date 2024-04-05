import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";

import LiveDataTable from "./LiveDataTable";
import LiveMap from "./LiveMap";
import { eventSourceLive } from "api/issLocation";

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

    eventSourceLive.addEventListener("message", messageHandler);

    return () => {
      eventSourceLive.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <Card className="m-4 bg-gray-900">
      <div className="flex flex-col items-center p-4 text-center">
        <div className="flex items-center">
          <span className="mr-2 h-3 w-3 animate-pulse rounded-full bg-red-500"></span>
          <Typography color="white" variant="h3" className="text-white">
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
        <LiveMap data={data} />
        <LiveDataTable data={data} />
      </div>
    </Card>
  );
}
