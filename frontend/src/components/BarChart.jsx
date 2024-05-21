import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";

export default function BarChart({ data }) {
  const chartData = data.reduce((nameCounts, record) => {
    const existingRecord = nameCounts.find((item) => item.name === record.name);
    if (existingRecord) {
      existingRecord.count += 1;
    } else {
      nameCounts.push({ name: record.name, count: 1 });
    }
    return nameCounts;
  }, []);

  return (
    <div>
      <VictoryChart
        theme={VictoryTheme.material}
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
              fill: "white",
            },
          }}
        />
        <VictoryAxis
          tickFormat={(x) => `${x}`}
          style={{
            tickLabels: { fontSize: 12, padding: 5, fill: "white" },
          }}
        />
        <VictoryBar
          horizontal
          data={chartData}
          x="name"
          y="count"
          style={{ data: { fill: "#c43a31" } }}
        />
      </VictoryChart>
    </div>
  );
}
