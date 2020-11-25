import React from "react";
import BigNumber from "./BigNumber";

// Calculates the groups score based on objective emassures
export const calculateScore = (
  design: number,
  codeQuality: number,
  groupMembers: number
) => {
  const val = 25 / (10 * 3); // Complex calculations
  return design * val + codeQuality * val + groupMembers * val;
};

const NumberOfPoints = () => {
  const percentagePoints = calculateScore(10, 10, 10); //10 is max
  const studentPoints = percentagePoints / 5;
  return (
    <BigNumber
      header="Number of percentage points group 80 deserve"
      value={percentagePoints + "%"}
      label={studentPoints + "/5 from students"}
    />
  );
};

export default NumberOfPoints;
