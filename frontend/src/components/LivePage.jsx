import { Typography } from "@material-tailwind/react";
import useLiveData from "./hooks/useLiveData";
import LiveDataTable from "./LiveDataTable";
import RouteMap from "./RouteMap";

export default function LivePage() {
  const data = useLiveData();

  const route = data ? [[data.latitude, data.longitude]] : [];

  return (
    <div>
      <div className="mb-2 mt-2 text-center">
        <Typography variant="h3">Live Data Tracking</Typography>
        <Typography variant="paragraph">
          Last update:{" "}
          {data &&
            `${new Date(data.timestamp).toLocaleDateString()} ${new Date(data.timestamp).toLocaleTimeString()}`}
        </Typography>
      </div>
      <div className="flex flex-col items-center justify-center space-y-4">
        <RouteMap route={route} />
        <LiveDataTable data={data} />
      </div>
    </div>
  );
}
