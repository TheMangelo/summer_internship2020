import getUrl from "../api/client";
import { ActionTypes } from "./actionTypes";
import { DispatchType } from "./types";

// Action creators for all backend data
export const getSearchMovies = (search: string) => {
  return async (dispatch: DispatchType) => {
    dispatch({ type: ActionTypes.SEARCH_LOADING, payload: [] });
    fetch(getUrl() + `/movies${search}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.SEARCH_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.SEARCH_ERROR, payload: error })
      );
  };
};

export const getCountriesNum = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.COUNTRY_NUM_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/stats/moviesFromCountries", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.COUNTRY_NUM_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.COUNTRY_NUM_ERROR, payload: error })
      );
  };
};

export const getRated = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.RATED_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/stats/moviesByRated", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.RATED_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.RATED_ERROR, payload: error })
      );
  };
};

export const getMoviesByYear = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.MOVIES_BY_YEAR_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/stats/moviesByYear", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.MOVIES_BY_YEAR_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.MOVIES_BY_YEAR_ERROR, payload: error })
      );
  };
};

export const getSingleMovie = (id: string) => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.SINGLE_MOVIE_LOADING,
      payload: [],
    });
    fetch(getUrl() + `/movies/${id}`, { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.SINGLE_MOVIE_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.SINGLE_MOVIE_ERROR, payload: error })
      );
  };
};

export const getAllCountries = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.ALL_COUNTRIES_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/countries", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.ALL_COUNTRIES_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.ALL_COUNTRIES_ERROR, payload: error })
      );
  };
};

export const getAllLanguages = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.ALL_LANGUAGES_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/languages", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.ALL_LANGUAGES_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.ALL_LANGUAGES_ERROR, payload: error })
      );
  };
};

export const getAllGenres = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.ALL_GENRES_LOADING,
      payload: [],
    });
    fetch(getUrl() + "/genres", { mode: "cors" })
      .then((response) => {
        dispatch({
          type: ActionTypes.ALL_GENRES_FINISHED,
          payload: response.json(),
        });
      })
      .catch((error) =>
        dispatch({ type: ActionTypes.ALL_GENRES_ERROR, payload: error })
      );
  };
};

export const getMyVotes = () => {
  return async (dispatch: DispatchType) => {
    dispatch({
      type: ActionTypes.MY_VOTES_LOADING,
      payload: [],
    });
    fetch(`${getUrl()}/user/votes`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("userId")}` },
      mode: "cors",
    })
      .then((r) => r.json())
      .then((response) => {
        dispatch({
          type: ActionTypes.MY_VOTES_FINISHED,
          payload: response,
        });
      })
      .catch((error) => {
        dispatch({ type: ActionTypes.MY_VOTES_ERROR, payload: error });
      });
  };
};
