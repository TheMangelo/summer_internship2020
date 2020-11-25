import React from "react";
import MoviePage from "../components/moviePage/MoviePage";
import renderer from "react-test-renderer";

test("<MoviePage/> test ", () => {
  const component = renderer.create(<MoviePage />).toJSON();
  expect(component).toMatchSnapshot();
});
