import React from "react";
import { PieLabelRenderProps } from "recharts";
import { ensureNumber } from "../functions";

// Percentage for each cell
const PieChartLabel = ({
  midAngle,
  cx,
  cy,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  if (
    !outerRadius ||
    !midAngle ||
    typeof cy === "undefined" ||
    typeof cx === "undefined" ||
    !percent ||
    // Does not show if the cell is tiny
    percent < 0.06
  ) {
    return null;
  }
  const RADIAN = Math.PI / 180;
  const radius = ensureNumber(outerRadius) - 25;
  const x = ensureNumber(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = ensureNumber(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
    >
      {(ensureNumber(percent) * 100).toFixed(1)}%
    </text>
  );
};

export default PieChartLabel;
