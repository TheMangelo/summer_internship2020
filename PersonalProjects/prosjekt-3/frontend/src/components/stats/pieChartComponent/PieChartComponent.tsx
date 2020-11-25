import React from "react";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import ChartComponentContainer from "../ChartComponent";
import CustomTooltip from "./CustomTooltip";
import PieChartLabel from "./PieChartLabel";
import { getTotalCount } from "../functions";
import { chartColors } from "../consts";
import { BaseChartProps } from "../types";

const PieChartComponent = ({ chartData, valueKey }: BaseChartProps) => {
  const dataKey = valueKey;
  const total = getTotalCount(chartData, dataKey);
  // Slice data in case of too many cells
  const slicedChartData = chartData.slice(0, 12);
  const slicedTotal = getTotalCount(slicedChartData, dataKey);
  // If one or more cells were sliced off, they are added in "others"
  if (total > slicedTotal) {
    slicedChartData.push({
      category: "Others",
      [dataKey]: total - slicedTotal,
      nameKey: "xx",
    });
  }
  return (
    <ChartComponentContainer
      renderChart={() => (
        <PieChart data={chartData}>
          {/* Listing all pie labels on the left side of the component */}
          <Legend
            layout="vertical"
            align="left"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: "5px", paddingRight: "2px" }}
          />
          <Tooltip content={<CustomTooltip totalCount={total} />} />
          <Pie
            data={slicedChartData}
            cx="50%"
            cy="50%"
            outerRadius="85%"
            dataKey={dataKey}
            nameKey="category"
            labelLine={false}
            label={PieChartLabel}
            blendStroke={true}
          >
            {/* Coloring of the cells */}
            {chartData.map((e, index: number) => (
              <Cell
                fill={chartColors[index % chartColors.length]}
                key={index}
              />
            ))}
          </Pie>
        </PieChart>
      )}
    />
  );
};

export default PieChartComponent;
