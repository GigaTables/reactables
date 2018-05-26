import React from 'react'
import renderer from 'react-test-renderer'
import Header from '../../../src/components/table/Header.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const columns = [
    {// include all defaults
        data: 'id',
        sortable: true, // true by defualt
        visible: true, // true by defualt
        searchable: true, // true by defualt
        discreteSearch: true, // false by default
        discreteSearchValue: function (title) {
            return 'Search by field - ' + title
        }
    },
    {
        data: 'title',
        cISearch: true, // default false
        discreteSearch: true, // false by default
        discreteSearchValue: function (title) {
            return 'Search by field - ' + title
        }
    },
    {
        data: 'desc',
        sortable: false,
        discreteSearch: true,
        discreteCISearch: true // default false
    },
    {
        data: 'date',
        searchable: false
    },
    {
        data: 'info'
    },
    { data: 'field1' },
    { data: 'field2' },
    { data: 'field3', visible: false }
]

it('renders Header title correctly', () => {
    const tree = renderer.create(
        <Header
            gteSort="sortable"
            data="title"
            sortDirection={0}
            sortId="1"
            columnsSearch={{ 'title': 'foo' }}
            columns={columns}>Title</Header>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    
    const obj = shallow(
        <Header
            gteSort="sortable"
            data="id"
            sortDirection={0}
            sortId="0"
            columnsSearch={{ 'id': 123 }}
            columns={columns}>Id</Header>
    )
    
    obj.instance().shouldComponentUpdate({
        gteSort: 'sortable',
        sortId: 1,
        sortDirection: 0
    })
})
