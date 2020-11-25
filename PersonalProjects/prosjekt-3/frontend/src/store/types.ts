import { CountryChartRow } from "../components/stats/types";
import { MovieData } from "../movieType";

export interface State {
  searchMoviesReducer: SearchMoviesState;
  countryNumReducer: CountryNumState;
  ratedReducer: RatedState;
  moviesByYearReducer: MoviesByYearState;
  singleMovieReducer: SingleMovieState;
  allCountriesReducer: AllCountriesState;
  allLanguagesReducer: AllLanguagesState;
  allGenresReducer: AllGenresState;
  userVoteReducer: AllMyVotesState;
}

export type Action = {
  type: string;
  payload: any;
};

export type DispatchType = (args: Action) => Action;

type BaseState = {
  isLoading: boolean;
  errorMessage?: any;
};

export type SearchMoviesState = BaseState & {
  movies?: Promise<{ rows: MovieData[]; numberOfRows: number }>;
};

export type CountryNumState = BaseState & {
  countries?: Promise<{
    rows: CountryChartRow[];
    numberOfMovies: number;
  }>;
};

export type RatedState = BaseState & {
  rated?: Promise<
    {
      rated: string;
      count: number;
    }[]
  >;
};

export type MoviesByYearState = BaseState & {
  moviesByYear?: Promise<
    {
      year: number;
      count: number;
    }[]
  >;
};

export type SingleMovieState = BaseState & {
  singleMovie?: Promise<MovieData>;
};

export type NameIdList = { name: string; id: string }[];

export type AllCountriesState = BaseState & {
  countries?: Promise<NameIdList>;
};

export type AllLanguagesState = BaseState & {
  languages?: Promise<NameIdList>;
};

export type AllGenresState = BaseState & {
  genres?: Promise<NameIdList>;
};

export type MovieVotesState = {
  movieid: string;
  value: number;
};

export type AllMyVotesState = BaseState & {
  votes: MovieVotesState[];
  isFetching: boolean;
};
