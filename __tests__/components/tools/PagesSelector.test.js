import React from 'react'
import renderer from 'react-test-renderer'
import PagesSelector from '../../../src/components/tools/PagesSelector.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it('renders PagesSelector correctly', () => {
    const tree = renderer.create(
        <PagesSelector
            lang="en"
            defaultPerPage="100"
            perPageRows={[ 25, 50, 100, 200 ]}
            page="1"
            perPage={50}/>
    ).toJSON()
    expect(tree).toMatchSnapshot()
    
    const obj = shallow(
        <PagesSelector
            lang="en"
            defaultPerPage="100"
            perPageRows={[ 25, 50, 100, 200 ]}
            page="1"
            perPage={50}
            updatePerPage={(e) => {}}/>
    )
    obj.instance().shouldComponentUpdate({
        perPageRows: [ 25, 50, 100, 200 ],
        perPage: 100
    })
    obj.find('select').simulate('change')
})
