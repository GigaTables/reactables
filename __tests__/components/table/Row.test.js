import React from 'react'
import renderer from 'react-test-renderer'
import Column from '../../../src/components/table/Column.js'
import Row from '../../../src/components/table/Row.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

it('renders Row correctly', () => {
    const tree = renderer.create(
        <Row
            clickedRow={() => {}}
            count={0}
            gteRowId={71}
            minRow={0}
            maxRow={0}
            selectedRows={[]}
            editableCells={false}>
            <Column
                count={0}
                dataIndex="desc"
                gteRowId={71}
                minRow={0}
                maxRow={0}
                selectedRows={[]}
                cell={'01'}
                editCell={() => {}}
            >Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
        </Row>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    
    const obj = shallow(
        <Row
            clickedRow={() => {}}
            count={1}
            gteRowId={71}
            minRow={1}
            maxRow={1}
            selectedRows={[]}
            editableCells={false}>
            <Column
                count={1}
                dataIndex="desc"
                gteRowId={71}
                minRow={0}
                maxRow={0}
                selectedRows={[]}
                cell={'01'}>Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
        </Row>
    )
    
    obj.instance().shouldComponentUpdate({
        gteRowId: 1,
        count: 1,
        selectedRows: [],
        dataIndex: 'title',
        minRow: 1,
        maxRow: 1
    })
})
