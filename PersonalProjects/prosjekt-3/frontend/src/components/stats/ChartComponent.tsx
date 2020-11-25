import React from "react";
import { ResponsiveContainer } from "recharts";

interface ChartComponentContainerProps {
  renderChart: () => JSX.Element;
}

// Wrapper for all charts making them responsive
const ChartComponentContainer = ({
  renderChart,
}: ChartComponentContainerProps) => (
  <ResponsiveContainer width="100%" height={300}>
    {renderChart()}
  </ResponsiveContainer>
);

export default ChartComponentContainer;
