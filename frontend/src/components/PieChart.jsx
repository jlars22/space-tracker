import { Typography } from "@material-tailwind/react";
import React from "react";
import { VictoryPie } from "victory";

export default function PieChart({ data }) {
  const visibilityDistribution = calculateVisibilityDistribution(data);

  const colors = ["#FF5733", "#33FF89", "#3377FF"];

  return (
    <div className="flex h-80 flex-col items-center">
      <Typography color="white" variant="h6" className="text-center">
        Visibility distribution
      </Typography>
      <VictoryPie
        colorScale={colors}
        data={visibilityDistribution}
        padAngle={3}
        innerRadius={50}
        width={400}
        height={300}
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        style={{
          labels: { fill: "white", fontSize: 14 },
          data: { fillOpacity: 0.9, stroke: "#191D28", strokeWidth: 2 },
        }}
        padding={{ top: 20, bottom: 60, left: 90, right: 90 }}
      />
    </div>
  );
}

function calculateVisibilityDistribution(data) {
  const visibilityCounts = {};
  data.forEach(({ visibility }) => {
    visibilityCounts[visibility] = (visibilityCounts[visibility] || 0) + 1;
  });

  return Object.keys(visibilityCounts).map((visibility) => ({
    x: visibility,
    y: visibilityCounts[visibility],
  }));
}
