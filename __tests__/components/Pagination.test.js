import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../src/components/Pagination.js'
import { shallow } from 'enzyme';

it('renders Pagination correctly', () => {
  const tree = renderer.create(
    <Pagination
    lang="en"
    countRows={229}
    fromRow={0}
    page={1}
    perPage={50} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

  const obj = shallow(
    <Pagination
    lang="en"
    countRows={229}
    fromRow={0}
    page={1}
    perPage={50} />
  );

  obj.instance().shouldComponentUpdate({
    lang: 'en',
    countRows: 230,
    fromRow: 0,
    page: 1,
    perPage: 50
  });
});
