import React from "react";
import styled from "styled-components";
import CountryBarChart from "./CountryBarChart";
import MoviesByYearLine from "./MoviesByYearLine";
import NumberOfMovies from "./NumberOfMovies";
import NumberOfPoints from "./NumberOfPoints";
import PageHeader from "../PageHeader";
import RatedPieChart from "./RatedPieChart";

const PageWrapper = styled.div`
  background: url(/background2.jpg) no-repeat center center fixed;
  background-size: 100% 100%;
  min-height: 100vh;
  @media (max-width: 700px) {
    padding: 0px;
  }
`;

const StatsWrapper = styled.div`
  margin: 0px 200px 0px 200px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  @media (max-width: 1300px) {
    margin: 0px;
  }
`;

const NumbersWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`;

const StatsPage = () => (
  <PageWrapper>
    <PageHeader />
    <StatsWrapper>
      <NumbersWrapper>
        <NumberOfMovies />
        <NumberOfPoints />
      </NumbersWrapper>
      <CountryBarChart />
      <MoviesByYearLine />
      <RatedPieChart />
    </StatsWrapper>
  </PageWrapper>
);

export default StatsPage;
