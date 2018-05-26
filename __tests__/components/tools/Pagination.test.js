import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '../../../src/components/tools/Pagination.js'
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

    // test selectedPage >= CommonConstants.MORE_PAGES && selectedPage <= pages - CommonConstants.MORE_PAGES
    const treeMoreAndLess = renderer.create(
        <Pagination
            lang="en"
            countRows={1055}
            fromRow={450}
            page={9}
            perPage={25}/>
    ).toJSON();
    expect(treeMoreAndLess).toMatchSnapshot();
    // test selected page less than more
    const lessThanMore = renderer.create(
        <Pagination
            lang="en"
            countRows={1055}
            fromRow={150}
            page={3}
            perPage={50}/>
    ).toJSON();
    expect(lessThanMore).toMatchSnapshot();
    // test selected page less than more
    const tail = renderer.create(
        <Pagination
            lang="en"
            countRows={1055}
            fromRow={900}
            page={18}
            perPage={50}/>
    ).toJSON();
    expect(tail).toMatchSnapshot();
    
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
