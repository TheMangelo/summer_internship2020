import React from "react";
import renderer from "react-test-renderer";
import NumberOfPoints from "../components/stats/NumberOfPoints";

test("<NumberOfPoints/> test ", () => {
  const component = renderer.create(<NumberOfPoints />).toJSON();
  expect(component).toMatchSnapshot();
});
