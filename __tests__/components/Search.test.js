import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../../src/components/tools/Search.js'

it('renders Search correctly', () => {
  const tree = renderer.create(
    <Search
    lang="en"
    search=""
    doSearch={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
