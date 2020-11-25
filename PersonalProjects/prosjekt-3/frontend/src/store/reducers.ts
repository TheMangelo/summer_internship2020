import { ActionTypes } from "./actionTypes";
import {
  Action,
  AllCountriesState,
  AllGenresState,
  AllLanguagesState,
  AllMyVotesState,
  CountryNumState,
  MoviesByYearState,
  RatedState,
  SearchMoviesState,
  SingleMovieState,
} from "./types";

const initialState = {
  isLoading: false,
};

export const searchMoviesReducer = (
  state: SearchMoviesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SEARCH_FINISHED:
      return { ...state, isLoading: false, movies: action.payload };
    case ActionTypes.SEARCH_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.SEARCH_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const countryNumReducer = (
  state: CountryNumState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.COUNTRY_NUM_FINISHED:
      return { ...state, isLoading: false, countries: action.payload };
    case ActionTypes.COUNTRY_NUM_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.COUNTRY_NUM_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const ratedReducer = (
  state: RatedState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.RATED_FINISHED:
      return { ...state, isLoading: false, rated: action.payload };
    case ActionTypes.RATED_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.RATED_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const moviesByYearReducer = (
  state: MoviesByYearState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.MOVIES_BY_YEAR_FINISHED:
      return { ...state, isLoading: false, moviesByYear: action.payload };
    case ActionTypes.MOVIES_BY_YEAR_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.MOVIES_BY_YEAR_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const singleMovieReducer = (
  state: SingleMovieState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.SINGLE_MOVIE_FINISHED:
      return { ...state, isLoading: false, singleMovie: action.payload };
    case ActionTypes.SINGLE_MOVIE_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.SINGLE_MOVIE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const allCountriesReducer = (
  state: AllCountriesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ALL_COUNTRIES_FINISHED:
      return { ...state, isLoading: false, countries: action.payload };
    case ActionTypes.ALL_COUNTRIES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ALL_COUNTRIES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const allLanguagesReducer = (
  state: AllLanguagesState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ALL_LANGUAGES_FINISHED:
      return { ...state, isLoading: false, languages: action.payload };
    case ActionTypes.ALL_LANGUAGES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ALL_LANGUAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const allGenresReducer = (
  state: AllGenresState = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.ALL_GENRES_FINISHED:
      return { ...state, isLoading: false, genres: action.payload };
    case ActionTypes.ALL_GENRES_LOADING:
      return { ...state, isLoading: true };
    case ActionTypes.ALL_GENRES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };
  }
  return state;
};

export const userVoteReducer = (
  state: AllMyVotesState = { isLoading: true, votes: [], isFetching: false },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.MY_VOTES_FINISHED:
      return {
        ...state,
        isLoading: false,
        votes: action.payload,
        isFetching: false,
      };
    case ActionTypes.MY_VOTES_LOADING:
      return { ...state, isLoading: true, isFetching: true };
    case ActionTypes.MY_VOTES_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
        isFetching: false,
      };
  }
  return state;
};
