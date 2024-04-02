import { Card, Typography } from "@material-tailwind/react";
import React, { useState, useEffect } from "react";
import eventSource from "api/issLocation";

const propertyNames = {
  latitude: "Latitude",
  longitude: "Longitude",
  altitude: "Altitude (km)",
  velocity: "Velocity (km/h)",
  visibility: "Visibility",
  country: "Country",
  timezone: "Timezone",
  timestamp: "Timestamp",
};

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

    eventSource.addEventListener("message", messageHandler);

    return () => {
      eventSource.removeEventListener("message", messageHandler);
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
          Last updated: {data && data.timestamp}
        </Typography>
        <div className="overflow-x-auto">
          <table className="mt-2 border-collapse border border-gray-600 text-white">
            <thead>
              <tr className="bg-gray-800">
                <th className="border border-gray-600 px-4 py-2">Property</th>
                <th className="border border-gray-600 px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Object.entries(data)
                  .filter(([key]) => key !== "timestamp")
                  .map(([key, value]) => (
                    <tr key={key} className="border border-gray-600">
                      <td className="border border-gray-600 px-4 py-2">
                        {propertyNames[key]}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {typeof value === "number" ? value.toFixed(2) : value}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
