import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../src/components/tools/Pagination.js'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

it('renders Pagination correctly', () => {
    const tree = renderer.create(
        <Pagination
            lang="en"
            countRows={249}
            fromRow={0}
            page={1}
            perPage={50}/>
    ).toJSON();
    expect(tree).toMatchSnapshot();

    const treeMore = renderer.create(
        <Pagination
            lang="en"
            countRows={555}
            fromRow={450}
            page={9}
            perPage={50}/>
    ).toJSON();
    expect(treeMore).toMatchSnapshot();
    // test MORE_PAGES === pages
    const noPagesContent = renderer.create(
        <Pagination
            lang="en"
            countRows={249}
            fromRow={200}
            page={5}
            perPage={50}/>
    ).toJSON();
    expect(noPagesContent).toMatchSnapshot();
    
    const obj = shallow(
        <Pagination
            lang="en"
            countRows={229}
            fromRow={0}
            page={1}
            perPage={50}/>
    );
    obj.instance().shouldComponentUpdate({
        lang: 'en',
        countRows: 230,
        fromRow: 0,
        page: 1,
        perPage: 50
    });
});
