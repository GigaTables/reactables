import React from 'react';
import renderer from 'react-test-renderer';
import Column from '../../src/components/Column.js'
import Row from '../../src/components/Row.js'

it('renders Row correctly', () => {
  const tree = renderer.create(
    <Row
    clickedRow={() => {}}
    count={0}
    gteRowId={71}
    minRow="0"
    maxRow="0"
    selectedRows={[]} >
    <Column
    count={0}
    dataIndex="desc"
    gteRowId={71}
    minRow="0"
    maxRow="0"
    selectedRows={[]}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
    </Row>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
