import { VictoryAxis, VictoryBar, VictoryChart } from "victory";
import { useAstronautData } from "./hooks/getAstronautCount";

export default function BarChart({ data }) {
  const chartData = useAstronautData(data);

  return (
    <div>
      <VictoryChart
        domainPadding={20}
        height={500}
        width={930}
        padding={{ top: 20, bottom: 30, left: 120, right: 20 }}
      >
        <VictoryAxis
          dependentAxis
          tickFormat={chartData.map((record) => record.count)}
          style={{
            tickLabels: {
              fontSize: 10,
              padding: 5,
            },
            grid: { stroke: "#d6d6d6" },
          }}
        />
        <VictoryAxis
          tickFormat={(x) => `${x}`}
          style={{
            tickLabels: { fontSize: 12, padding: 5 },
            grid: { stroke: "#d6d6d6" },
          }}
        />
        <VictoryBar
          horizontal
          data={chartData}
          x="name"
          y="count"
          style={{ data: { fill: "#FF694B" } }}
        />
      </VictoryChart>
    </div>
  );
}
