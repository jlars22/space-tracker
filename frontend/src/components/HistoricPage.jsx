import { Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { fetchSavedISSLocation } from "api/issLocation";
import PieChart from "./PieChart";
import RouteMap from "./RouteMap";
import ScatterPlot from "./ScatterPlot";
import { eventSourceIssInformation } from "api/issInformation";
import { fetchSavedAstronauts } from "api/astronauts";
import BarChart from "./BarChart";

export default function HistoricPage() {
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

  const route = historicalData.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  return (
    <Card className="m-4 bg-gray-900">
      <Typography color="white" variant="h3" className="mt-4 text-center">
        Amount of datasets: {historicalData.length}
      </Typography>
      <div className="mb-2 flex flex-col items-center justify-center space-y-9 p-4 text-center">
        <div className="flex items-center justify-center space-x-12">
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
        </div>

        <div className="flex items-center justify-center space-x-12">
          <Card className="bg-gray-800 p-4 shadow-md">
            <ScatterPlot data={historicalData} />
          </Card>
          <Card className="bg-gray-800 p-4 shadow-md">
            <PieChart data={historicalData} />
          </Card>
        </div>

        <div className="flex items-center justify-center space-x-12">
          <Card className="w-full bg-gray-800 p-4 shadow-md">
            <BarChart data={astronautData} />
          </Card>
        </div>

        <RouteMap route={route} />
      </div>
    </Card>
  );
}
