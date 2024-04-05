import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryTooltip,
  VictoryScatter,
  VictoryZoomContainer,
} from "victory";

export default function LineChart({ data, type, color, yAxisKey }) {
  return (
    <div className="flex h-96 items-center justify-center">
      <VictoryChart
        width={400}
        height={300}
        padding={{ left: 50, right: 30 }}
        domainPadding={{ y: [10, 10], x: [10, 10] }} // Add 20 units of padding to the top of the y-axis
        containerComponent={
          <VictoryZoomContainer
            style={{ touchAction: "none", cursor: "grab" }}
          />
        }
      >
        <VictoryLegend
          x={36}
          y={-30}
          orientation="horizontal"
          style={{ labels: { fill: "white" } }}
          data={[{ name: type, symbol: { fill: color } }]}
        />

        <VictoryAxis
          dependentAxis
          tickCount={4}
          style={{
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
          tickFormat={(y) => Math.round(y)}
        />
        <VictoryAxis
          label="Time"
          style={{
            axisLabel: { padding: 10, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
          tickFormat={(x) => ""}
        />

        <VictoryLine
          style={{
            data: { stroke: color },
          }}
          data={data.map((d) => ({ x: new Date(d.timestamp), y: d[yAxisKey] }))}
        />

        <VictoryScatter
          style={{ data: { fill: color } }}
          size={3}
          data={data.map((d) => ({ x: new Date(d.timestamp), y: d[yAxisKey] }))}
          labels={({ datum }) => `${type}: ${Math.round(datum.y)}`}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
}
