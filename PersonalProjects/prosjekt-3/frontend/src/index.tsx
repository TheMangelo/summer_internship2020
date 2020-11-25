import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Devops from "./components/devops";
import MoviePage from "./components/moviePage/MoviePage";
import Home from "./components/home/Home";
import SearchPage from "./components/searchPage/SearchPage";
import "semantic-ui-css/semantic.min.css";
import StatsPage from "./components/stats/StatsPage";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UserWrapper from "./components/modal/UserWrapper";
import {
  searchMoviesReducer,
  countryNumReducer,
  moviesByYearReducer,
  singleMovieReducer,
  allCountriesReducer,
  allLanguagesReducer,
  allGenresReducer,
  userVoteReducer,
  ratedReducer,
} from "./store/reducers";
import { createStore, applyMiddleware, Reducer, combineReducers } from "redux";
import { Action, State } from "./store/types";

const allReducers: Reducer<State, Action> = combineReducers({
  searchMoviesReducer,
  countryNumReducer,
  ratedReducer,
  moviesByYearReducer,
  singleMovieReducer,
  allCountriesReducer,
  allLanguagesReducer,
  allGenresReducer,
  userVoteReducer,
});

export const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <UserWrapper />
        <Route exact path="/devops" component={Devops} />
        <Route exact path="/" component={Home} />
        <Route exact path="/movies/:id" component={MoviePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/stats" component={StatsPage} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root") || document.createElement("div") //for testing purposes
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
