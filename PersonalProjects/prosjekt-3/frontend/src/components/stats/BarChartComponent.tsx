import React from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { CartesianChartProps } from "./types";
import ChartComponent from "./ChartComponent";

// Generic bar chart component
const BarChartComponent = ({
  chartData,
  valueKey,
  yAxisLabel,
}: CartesianChartProps) => (
  <ChartComponent
    renderChart={() => (
      <BarChart data={chartData}>
        <CartesianGrid stroke="#cccccc" vertical={false} />
        <Bar key={valueKey} fill="#3d7cc1" dataKey={valueKey} />
        <XAxis dataKey="category" height={55} angle={30} dy={20} interval={0} />
        <YAxis
          {...{
            label: {
              value: yAxisLabel,
              angle: -90,
              offset: 10,
              position: "insideLeft",
            },
          }}
        />
        <Tooltip
          {...{
            separator: ": ",
            cursor: { fill: "transparent" },
          }}
        />
      </BarChart>
    )}
  />
);

export default BarChartComponent;
