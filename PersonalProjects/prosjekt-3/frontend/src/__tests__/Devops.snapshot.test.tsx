import React from "react";
import renderer from "react-test-renderer";
import Devops from "../components/devops";

test("<Devops/> test ", () => {
  const component = renderer.create(<Devops />).toJSON();
  expect(component).toMatchSnapshot();
});
