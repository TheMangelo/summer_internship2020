import React from "react";
import styled from "styled-components";

const TooltipWrapper = styled.div`
  background: rgba(240, 240, 240);
  display: flex;
  flex-direction: column;
  padding: 3px;
  border: 1px solid black;
`;

interface CustomTooltipProps {
  payload?: Record<string, any>[];
  active?: boolean;
  totalCount: number;
}

// Tooltip when hovering pie charts
const CustomTooltip = ({ payload, active, totalCount }: CustomTooltipProps) => {
  if (active) {
    if (typeof payload !== "undefined") {
      const [{ name, value }] = payload;
      return (
        <TooltipWrapper>
          <b>{name}</b>
          <span>Total: {value}</span>
          <span>Percentage: {((value / totalCount) * 100).toFixed(2)}</span>
        </TooltipWrapper>
      );
    }
  }
  return null;
};

export default CustomTooltip;
