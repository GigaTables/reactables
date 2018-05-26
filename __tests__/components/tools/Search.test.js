import React from 'react';
import renderer from 'react-test-renderer';
import Search from '../../../src/components/tools/Search.js'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16/build/index'

configure({ adapter: new Adapter() })

it('renders Search correctly', () => {
  const tree = renderer.create(
    <Search
    lang="en"
    search=""
    doSearch={() => {}}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
    
    const obj = shallow(
        <Search
            lang="en"
            search=""
            doSearch={() => {}}/>
    )
    
    obj.instance().shouldComponentUpdate({
        search: 1
    })
});
