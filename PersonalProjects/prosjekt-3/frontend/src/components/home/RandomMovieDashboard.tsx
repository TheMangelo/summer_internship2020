import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import styled from "styled-components";
import { store } from "../..";
import getUrl from "../../api/client";
import { MovieData } from "../../movieType";
import MoviePreview from "../searchPage/MoviePreview";

const DashboardWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: space-evenly;
  border-radius: 20px;
  border: 2px black;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-top: 10px;
`;

interface MovieDashboardProps {
  numberOfMovies?: number;
}

// Three random movies in dashboard
const RandomMovieDashboard = ({ numberOfMovies = 24 }: MovieDashboardProps) => {
  const [mode, setMode] = useState<string>("");
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    fetch(`${getUrl()}/movies/random?limit=${numberOfMovies}`, { mode: "cors" })
      .then((r) => r.json())
      .then((r) => {
        setMode(r.mode.desc);
        setMovies(r.data);
      });
  }, [numberOfMovies]);

  const movieElements = movies.map((movie) => {
    return <MoviePreview key={movie.id} data={movie}></MoviePreview>;
  });

  return (
    <Provider store={store}>
      <DashboardWrapper>
        <h3>
          <em>{mode}</em>
        </h3>
      </DashboardWrapper>
      <DashboardWrapper>{movieElements}</DashboardWrapper>
    </Provider>
  );
};

export default RandomMovieDashboard;
