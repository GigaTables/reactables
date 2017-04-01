import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../src/components/Pagination.js'

it('renders Pagination correctly', () => {
  const tree = renderer.create(
    <Pagination
    lang="en"
    countRows="229"
    fromRow="0"
    page="1"
    perPage="50" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
