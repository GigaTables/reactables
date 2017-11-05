import React from 'react';
import renderer from 'react-test-renderer';
import Column from '../../src/components/table/Column.js'
import { shallow } from 'enzyme';

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

  const obj = shallow(
    <Column
    count={0}
    dataIndex="desc"
    gteRowId={71}
    minRow="0"
    maxRow="0"
    selectedRows={[]}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
  );

  obj.instance().shouldComponentUpdate({
    gteRowId: 1,
    count: 1,
    selectedRows: [],
    dataIndex: 'title'
  });
});
