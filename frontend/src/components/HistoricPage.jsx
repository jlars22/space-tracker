import { Card, Typography } from "@material-tailwind/react";
import BarChart from "./BarChart";
import { useHistoricalDataAndSubscribe } from "./hooks/getHistoricalDataAndSubscribe";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import RouteMap from "./RouteMap";
import ScatterPlot from "./ScatterPlot";

export default function HistoricPage() {
  const { historicalData, astronautData } = useHistoricalDataAndSubscribe();

  const route = historicalData.map((point) => [
    point.latitude,
    point.longitude,
  ]);

  return (
    <div>
      <div className="mb-2 mt-2 text-center">
        <Typography variant="h3">History Data</Typography>
        <Typography variant="paragraph">
          Amount of datasets: {historicalData.length}
        </Typography>
      </div>
      <div className="mb-2 flex flex-col items-center justify-center space-y-9 p-4 text-center">
        <div className="flex items-center justify-center space-x-12">
          <Card className=" rounded-md border-2 p-4 shadow-sm">
            <LineChart
              data={historicalData}
              type="Velocity (km/h)"
              unit="km/h"
              color="#FF9800"
              yAxisKey="velocity"
            />
          </Card>
          <Card className="rounded-md border-2 p-4 shadow-sm">
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
          <Card className="rounded-md border-2 p-4 shadow-sm">
            <ScatterPlot data={historicalData} />
          </Card>
          <Card className="rounded-md border-2 p-4 shadow-sm">
            <PieChart data={historicalData} />
          </Card>
        </div>

        <div className="flex items-center justify-center space-x-12">
          <Card className="w-full  rounded-md border-2 p-4 shadow-sm">
            <BarChart data={astronautData} />
          </Card>
        </div>

        <RouteMap route={route} />
      </div>
    </div>
  );
}
