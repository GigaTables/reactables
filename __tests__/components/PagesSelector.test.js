import React from 'react';
import renderer from 'react-test-renderer';
import PagesSelector from '../../src/components/tools/PagesSelector.js'
import { shallow } from 'enzyme';

it('renders PagesSelector correctly', () => {
  const tree = renderer.create(
    <PagesSelector
    lang="en"
    defaultPerPage="100"
    perPageRows={[25, 50, 100, 200]}
    page="1"
    perPage={50} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

  const obj = shallow(
    <PagesSelector
    lang="en"
    defaultPerPage="100"
    perPageRows={[25, 50, 100, 200]}
    page="1"
    perPage={50} />
  );

  obj.instance().shouldComponentUpdate({
    perPageRows: [25, 50, 100, 200],
    perPage: 100
  });
});
