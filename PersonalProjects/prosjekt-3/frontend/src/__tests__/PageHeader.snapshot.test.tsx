import React from 'react';
import renderer from 'react-test-renderer';
import PageHeader from '../components/PageHeader';

test('<PageHeader/> test ', () => {
  const component = renderer.create(<PageHeader />).toJSON();
  expect(component).toMatchSnapshot();
});
