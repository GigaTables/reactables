import React from 'react';
import renderer from 'react-test-renderer';
import Column from '../../src/components/Column.js'

it('renders Column correctly', () => {
  const tree = renderer.create(
    <Column
    count={0}
    dataIndex="desc"
    gteRowId={71}
    minRow="0"
    maxRow="0"
    selectedRows={[]}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
