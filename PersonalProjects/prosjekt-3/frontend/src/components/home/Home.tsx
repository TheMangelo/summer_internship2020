import React from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import { store } from "../..";
import RandomMovieDashboard from "./RandomMovieDashboard";
import SearchComponent from "../SearchComponent";
import StatsLink from "../stats/StatsLink";
import { AnimationWrapper } from "react-hover-animation";

const PageWrapper = styled.div`
  height: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(/backgroundHome.jpg) no-repeat center center fixed;
  background-size: cover;
  background-position-x: 60%;
`;

const MovieDashboardWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  @media screen and (max-width: 530px) {
    display: none;
  }
`;

const Header = styled.div`
  font-weight: bold;
  font-size: 100px;
  color: #d93223;
  margin: 50px;
  margin-top: 18%;
  @media (max-width: 530px) {
    font-size: 60px;
  }
  &:hover {
    cursor: default;
  }
`;

const Home = () => (
  <Provider store={store}>
    <PageWrapper>
      <Header>MovieDB</Header>
      <SearchComponent size="large" button={true} />
      <AnimationWrapper>
        <StatsLink />
      </AnimationWrapper>
      <MovieDashboardWrapper>
        <RandomMovieDashboard numberOfMovies={3} />
      </MovieDashboardWrapper>
    </PageWrapper>
  </Provider>
);

export default Home;
