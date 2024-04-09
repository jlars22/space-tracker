import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictoryTooltip,
} from "victory";

export default function ScatterPlot({ data }) {
  return (
    <div className="flex h-80 items-center justify-center">
      <VictoryChart
        width={400}
        height={300}
        padding={{ left: 60, right: 30, bottom: 50 }}
        domainPadding={{ y: [10, 10], x: [10, 10] }}
      >
        <VictoryAxis
          label="Velocity (km/h)"
          style={{
            axisLabel: { padding: 35, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Altitude (km)"
          style={{
            axisLabel: { padding: 50, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
        />
        <VictoryScatter
          style={{ data: { fill: "#FF5733" } }}
          size={3}
          data={data.map((d) => ({ x: d.velocity, y: d.altitude }))}
          labels={({ datum }) =>
            `Altitude: ${Math.round(datum.y)}, Velocity: ${Math.round(datum.x)}`
          }
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
}
