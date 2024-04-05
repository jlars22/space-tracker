import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { eventSourceSaved, fetchSavedISSLocation } from "api/issLocation";
import PieChart from "./PieChart";

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
      <Typography color="white" variant="h3" className="mt-4 text-center">
        Amount of datasets: {historicalData.length}
      </Typography>
      <div className="mb-2 flex flex-col items-center justify-center space-y-9 p-4 text-center">
        <div className="flex items-center justify-center space-x-9">
          <Card className="bg-gray-800 p-4 shadow-md">
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
          <Card className="h-auto bg-gray-800 p-4 shadow-md">
            <PieChart data={historicalData} />
          </Card>
        </div>
        <div className="flex items-center justify-center space-x-9">
          <Card className="bg-gray-800 p-4 shadow-md"></Card>
        </div>
      </div>
    </Card>
  );
}
