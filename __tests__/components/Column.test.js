import React from 'react'
import renderer from 'react-test-renderer'
import Column from '../../src/components/table/Column.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it('renders Column correctly', () => {
    const tree = renderer.create(
        <Column
            count={0}
            dataIndex="desc"
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
            editableCells={true}
            editedCell={1}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    
    const progressBar = renderer.create(
        <Column
            count={0}
            dataIndex="desc"
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
            isProgressBar={true}>12</Column>
    ).toJSON()
    expect(progressBar).toMatchSnapshot()
    
    const obj = shallow(
        <Column
            count={0}
            dataIndex="desc"
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
    )
    obj.instance().shouldComponentUpdate({
        gteRowId: 1,
        count: 1,
        selectedRows: [],
        dataIndex: 'title'
    })
    obj.instance().changeCell({
        target: {
            dataset: {
                index: 123
            }
        }
    })
})
