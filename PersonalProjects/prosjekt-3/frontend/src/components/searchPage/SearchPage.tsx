import React, { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { store } from "../..";
import Filter from "./Filter";
import MovieDashboard from "./MovieDashboard";
import PageHeader from "../PageHeader";
import Sort from "./Sort";
import StatsLink from "../stats/StatsLink";
import { getSearchMovies } from "../../store/actionCreators";
import { State } from "../../store/types";
import { MovieData } from "../../movieType";
import { Button, Header } from "semantic-ui-react";

const PageButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  justify-content: space-evenly;
  margin: 10px 0px 20px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-right: 140px;
  background-image: linear-gradient(180deg, #c9c8c7, #b6ad9e);
  background-position-y: 0px;
  background-size: cover;

  @media (max-width: 1200px) {
    padding-right: 0px;
  }
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

// Wraps sort, filtering and stats-button
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: left;
  height: 100vh;
  @media (max-width: 700px) {
    height: auto;
  }
`;

const RightWrapper = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (max-width: 600px) {
    margin: 0px;
  }
`;

const SearchPage = () => {
  const [page, setPage] = useState<number>(0);
  const dispatch = useDispatch();
  const history = useHistory();

  const moviesPromise = useSelector(
    (state: State) => state.searchMoviesReducer.movies
  );

  const [movies, setMovies] = useState<MovieData[]>([]);
  const [numMovies, setNumMovies] = useState<number>(0);

  useEffect(() => {
    const currentPage = new URL(window.location.href).searchParams.get("page");
    currentPage ? setPage(parseInt(currentPage, 10)) : setPage(0);
    if (moviesPromise) {
      moviesPromise
        .then((r: { rows: MovieData[]; numberOfRows: number }) => {
          return r;
        })
        .then((data: { rows: MovieData[]; numberOfRows: number }) => {
          setMovies(data.rows);
          setNumMovies(data.numberOfRows);
        });
    }
  }, [moviesPromise, movies]);

  const search = React.useCallback(
    (text: string) => dispatch(getSearchMovies(text)),
    [dispatch]
  );

  const handleButtonClick = (newPage: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", newPage.toString());
    history.push("/search" + url.search);
    search(url.search || "");
    setPage(newPage);
  };

  return (
    <Provider store={store}>
      <PageHeader />
      <Wrapper>
        <LeftWrapper>
          <StatsLink />
          <Sort />
          <Filter />
        </LeftWrapper>
        <RightWrapper>
          <Header content={`Movies: ${numMovies}`} />
          <MovieDashboard />
          <PageButtonsWrapper>
            <Button
              content="Prev"
              size="large"
              onClick={() => page !== 0 && handleButtonClick(page - 1)}
            />
            <Header
              content={`Page ${page + 1} / ${Math.ceil(numMovies / 24) || 1}`}
            />
            <Button
              content="Next"
              size="large"
              onClick={() => {
                if (numMovies)
                  numMovies / 24 > page + 1 && handleButtonClick(page + 1);
              }}
            />
          </PageButtonsWrapper>
        </RightWrapper>
      </Wrapper>
    </Provider>
  );
};

export default SearchPage;
