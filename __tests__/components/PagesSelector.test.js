import React from 'react';
import renderer from 'react-test-renderer';
import PagesSelector from '../../src/components/PagesSelector.js'

it('renders PagesSelector correctly', () => {
  const tree = renderer.create(
    <PagesSelector
    lang="en"
    defaultPerPage="100"
    perPageRows={[25, 50, 100, 200]}
    page="1"
    perPage="50" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
