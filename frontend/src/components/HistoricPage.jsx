import { Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { eventSourceSaved, fetchSavedISSLocation } from "api/issLocation";

export default function HistoricPage() {
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    fetchSavedISSLocation()
      .then((data) => setHistoricalData(data))
      .catch((error) => console.error("Error:", error));

    const messageHandler = (event) => {
      const newData = JSON.parse(event.data);
      setHistoricalData((prevData) => [...prevData, newData]);
    };

    eventSourceSaved.addEventListener("message", messageHandler);

    return () => {
      eventSourceSaved.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <Card className="m-4 bg-gray-900">
      <div className="flex items-center justify-center p-4 text-center">
        <Card className="mr-4 bg-gray-800 p-4 shadow-md">
          <LineChart
            data={historicalData}
            type="Velocity (km/h)"
            unit="km/h"
            color="#FF9800"
            yAxisKey="velocity"
          />
        </Card>
        <Card className="bg-gray-800 p-4 shadow-md">
          <LineChart
            data={historicalData}
            type="Altitude (km)"
            unit="km"
            color="#2C7865"
            yAxisKey="altitude"
          />
        </Card>
      </div>
    </Card>
  );
}
