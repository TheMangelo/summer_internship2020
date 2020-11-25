import React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CartesianChartProps } from "./types";
import ChartComponent from "./ChartComponent";

// Generic line chart component
const LineChartComponent = ({
  chartData,
  valueKey,
  yAxisLabel,
}: CartesianChartProps) => (
  <ChartComponent
    renderChart={() => (
      <LineChart data={chartData}>
        <CartesianGrid stroke="#cccccc" />
        <Line
          key={valueKey}
          fill="#3d7cc1"
          dataKey={valueKey}
          dot={false}
          activeDot={true}
          strokeWidth={2}
        />
        <XAxis
          dataKey="category"
          height={55}
          angle={35}
          dy={20}
          interval={7}
          padding={{ left: 1, right: 8 }}
        />
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
      </LineChart>
    )}
  />
);

export default LineChartComponent;
