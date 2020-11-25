import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { State } from "../../store/types";
import { MovieData } from "../../movieType";
import Loading from "../Loading";
import MoviePreview from "./MoviePreview";

const DashboardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 20px;
  border: 2px black;
  width: 100%;
  @media (max-width: 600px) {
    padding: 0px;
  }
  @media (max-width: 370px) {
    justify-content: center;
  }
`;

const NoMoviesWrapper = styled.div`
  margin: 20px;
`;

interface MovieDashboardProps {
  numberOfMovies?: number;
}

type moviesResponse = {
  rows: MovieData[];
  numberOfRows: number;
};

// showing movie previews used in search and home
const MovieDashboard = ({ numberOfMovies = 24 }: MovieDashboardProps) => {
  const { movies: moviesPromise, isLoading, errorMessage } = useSelector(
    (state: State) => state.searchMoviesReducer
  );

  const [dashBoardIsLoading, setdashBoardIsLoading] = useState<boolean>(true);

  const [movies, setMovies] = useState<{
    rows: MovieData[];
    numberOfRows: number;
  }>({ rows: [], numberOfRows: 0 });
  const [previewList, setPreviewList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (moviesPromise) {
      moviesPromise
        .then((r: moviesResponse) => {
          return r;
        })
        .then((data: moviesResponse) => {
          setMovies(data);
          setdashBoardIsLoading(false);
        });
      let prevList: JSX.Element[] = [];
      for (let i = 0; i < numberOfMovies; i++) {
        if (movies) {
          if (i === movies.rows.length) break;
          prevList.push(
            <MoviePreview key={i} data={movies.rows[i]}></MoviePreview>
          );
        }
      }
      setPreviewList(prevList);
    }
  }, [moviesPromise, movies, numberOfMovies]);

  if (errorMessage) throw errorMessage;

  if (dashBoardIsLoading || isLoading) {
    return <Loading />;
  }
  return (
    <DashboardWrapper id={"dashboardWrapper"}>
      {previewList.length === 0 ? (
        <NoMoviesWrapper>Found no movies matching your search</NoMoviesWrapper>
      ) : (
        previewList
      )}
    </DashboardWrapper>
  );
};

export default MovieDashboard;
