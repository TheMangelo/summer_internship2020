import React from "react";
import renderer from "react-test-renderer";
import Home from "../components/home/Home";

test("<Home/> test ", () => {
  const component = renderer.create(<Home />).toJSON();
  expect(component).toMatchSnapshot();
});
