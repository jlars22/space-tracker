import React from "react";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryLegend } from "victory";

export default function LineChart({ data, type, color, yAxisKey }) {
  return (
    <div className="flex flex-col items-center">
      <VictoryChart
        width={400}
        height={300}
        padding={{ top: 40, bottom: 30, left: 80, right: 30 }}
      >
        <VictoryLegend
          x={67}
          y={0}
          orientation="horizontal"
          style={{ labels: { fill: "white" } }}
          data={[{ name: type, symbol: { fill: color } }]}
        />

        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
          }}
        />
        <VictoryAxis
          label="Time"
          style={{
            axisLabel: { padding: 10, fill: "white" },
            tickLabels: { fill: "white" },
            axis: { stroke: "white" },
          }}
          tickFormat={(x) => ""}
        />

        <VictoryLine
          style={{
            data: { stroke: color },
          }}
          data={data.map((d) => ({ x: new Date(d.timestamp), y: d[yAxisKey] }))}
        />
      </VictoryChart>
    </div>
  );
}
