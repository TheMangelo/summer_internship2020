import React from "react";
import BigNumber from "../components/stats/BigNumber";
import renderer from "react-test-renderer";

test("<BigNumber/> test ", () => {
  const component = renderer
    .create(<BigNumber header="hei" value={2} />)
    .toJSON();
  expect(component).toMatchSnapshot();
});
