import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryLine,
  VictoryScatter,
  VictoryTooltip,
} from "victory";

export default function LineChart({ data, type, color, yAxisKey }) {
  const chartData = data.map((d) => ({
    x: new Date(d.timestamp),
    y: d[yAxisKey],
  }));

  return (
    <div className="flex h-80 items-center justify-center">
      <VictoryChart
        width={400}
        height={300}
        padding={{ left: 60, right: 30, bottom: 40, top: 30 }}
        domainPadding={{ y: [10, 10], x: [10, 10] }}
      >
        <VictoryLegend
          orientation="horizontal"
          data={[{ name: type, symbol: { fill: color } }]}
        />

        <VictoryAxis
          dependentAxis
          style={{
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
        />
        <VictoryAxis
          label="Time"
          style={{
            grid: { stroke: "#434549", strokeWidth: 0.5 },
          }}
          tickFormat={(x) => ""}
        />

        <VictoryLine
          style={{
            data: { stroke: color },
          }}
          data={chartData}
        />

        <VictoryScatter
          style={{ data: { fill: color } }}
          size={2}
          data={chartData}
          labels={({ datum }) => `${type}: ${Math.round(datum.y)}`}
          labelComponent={<VictoryTooltip />}
        />
      </VictoryChart>
    </div>
  );
}
