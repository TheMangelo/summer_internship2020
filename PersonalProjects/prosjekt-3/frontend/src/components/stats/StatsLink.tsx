import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: 70px;
  height: 35px;
  font-weight: bold;
  font-size: 20px;
  color: #142740;
  background-color: #fff2e3;
  border: solid;
  border-radius: 3px;
  &:hover {
    color: black;
    cursor: pointer;
  }
`;

// Buton linking to stats page
const StatsLink = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/stats");
  };
  return <Wrapper onClick={handleClick}> Stats</Wrapper>;
};

export default StatsLink;
