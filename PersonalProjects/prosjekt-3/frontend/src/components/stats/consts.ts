import styled from "styled-components";

export const chartColors = [
  "#3d7cc1",
  "#56b676",
  "#fcb226",
  "#0d8073",
  "#6d3789",
  "#6dbcb4",
  "#cb5958",
];

// Wrapper for charts
export const Wrapper = styled.div`
  width: 500px;
  border-radius: 3px;
  border: solid;
  margin: 10px;
  background: rgb(250, 250, 250);
  @media (max-width: 580px) {
    width: 450px;
  }
  @media (max-width: 480px) {
    width: 350px;
  }
  @media (max-width: 400px) {
    width: 300px;
  }
`;

// Header for charts
export const Header = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
`;

// For charts
export const keys = { value: "number", label: "category" };
