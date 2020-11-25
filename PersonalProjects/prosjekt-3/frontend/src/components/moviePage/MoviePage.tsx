import React from "react";
import styled from "styled-components";
import MovieComponent from "./MovieComponent";
import PageHeader from "../PageHeader";
import { Provider } from "react-redux";
import { store } from "../..";

const Wrapper = styled.div`
  background: url(/background2.jpg) no-repeat center center fixed;
  padding: 50px;
  @media (max-width: 700px) {
    padding: 0px;
  }
`;

const MoviePage = () => (
  <Provider store={store}>
    <PageHeader />
    <Wrapper>
      <MovieComponent />
    </Wrapper>
  </Provider>
);

export default MoviePage;
