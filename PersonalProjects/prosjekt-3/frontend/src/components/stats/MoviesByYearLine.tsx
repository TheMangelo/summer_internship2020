import React, { useEffect, useState } from "react";
import { createChartData } from "./functions";
import { MoviesByYearChartData } from "./types";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getMoviesByYear } from "../../store/actionCreators";
import { State } from "../../store/types";
import { Header, keys, Wrapper } from "./consts";
import LineChartComponent from "./LineChartComponent";
import Loading from "../Loading";

const MoviesByYearLine = () => {
  const [movies, setMovies] = useState<MoviesByYearChartData>([]);

  const dispatch = useDispatch();

  const { moviesByYear: moviesPromise, isLoading, errorMessage } = useSelector(
    (state: State) => state.moviesByYearReducer
  );

  useEffect(() => {
    if (moviesPromise) {
      moviesPromise.then(
        (
          r: {
            year: number;
            count: number;
          }[]
        ) => {
          setMovies(r);
        }
      );
    } else {
      dispatch(getMoviesByYear());
    }
  }, [moviesPromise, dispatch]);

  const data: Record<string, string | number>[] = [];
  let moviesMap: Map<string, number> = new Map();

  if (movies === []) {
    return <div>loading...</div>;
  }

  for (let i = 0; i < movies.length; i++) {
    if (i !== movies.length - 1) {
      for (let j = 0; j < movies[i + 1].year - movies[i].year; j++) {
        moviesMap.set((movies[i].year + j).toString(), 0.1); // recharts does not add 0 values to chart. Will still visually be 0
      }
    }
    moviesMap.set(movies[i].year.toString(), movies[i].count);
  }

  for (let [key, value] of moviesMap) {
    data.push({ [keys.label]: key, [keys.value]: value });
  }
  const chartData = createChartData(data, keys);

  if (!chartData) return null;
  if (errorMessage) throw errorMessage;
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Wrapper>
        <Header>Movies by year</Header>
        <LineChartComponent
          chartData={chartData}
          valueKey={keys.value}
          yAxisLabel="Movie Count"
        />
      </Wrapper>
    </>
  );
};

export default MoviesByYearLine;
