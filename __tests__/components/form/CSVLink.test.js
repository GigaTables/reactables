import React from 'react'
import renderer from 'react-test-renderer'
import CSVLink from '../../../src/components/form/CSVLink.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

it('renders CSVLink correctly', () => {
    const tree = renderer.create(
        <CSVLink
            active={false}
            jsonData={
                {
                    'rows': [
                        {
                            'GT_RowId': 1059,
                            'title': 'Test 1059st row',
                            'id': 1059,
                            'desc': 'Lorem Ipsum is simply dummy 1447 text of the printing and typesetting',
                            'info': 'some info some info some info some info',
                            'date': '15:28:06 01:05:2018',
                            'field1': 29,
                            'field2': 2293,
                            'field3': 13404
                        } ]
                }
            }
            key={1}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

const obj = shallow(
    <CSVLink
        active={false}
        jsonData={
            {
                'rows': [
                    {
                        'GT_RowId': 1059,
                        'title': 'Test 1059st row',
                        'id': 1059,
                        'desc': 'Lorem Ipsum is simply dummy 1447 text of the printing and typesetting',
                        'info': 'some info some info some info some info',
                        'date': '15:28:06 01:05:2018',
                        'field1': 29,
                        'field2': 2293,
                        'field3': 13404
                    } ]
            }
        }
        key={1}
    />
)

global.URL = {
    createObjectURL: (url) => {
    }
}
// todo: this mock is not working
// global.navigator = {
//     msSaveBlob: true
// }
// Object.defineProperty(window.navigator, 'msSaveBlob', {value: (k, v) => {}});
// Object.defineProperty(window.navigator, "msSaveBlob", (function(_value){
//     return {
//         get: function _get() {
//             return _value;
//         },
//         set: function _set(v) {
//             _value = v;
//         }
//     };
// })(window.navigator.msSaveBlob));

obj.instance().onClick([
    {
        'GT_RowId': 1059,
        'title': 'Test 1059st row',
        'id': 1059,
        'desc': 'Lorem Ipsum is simply dummy 1447 text of the printing and typesetting',
        'info': 'some info some info some info some info',
        'date': '15:28:06 01:05:2018',
        'field1': 29,
        'field2': 2293,
        'field3': 13404
    }
])
obj.instance().onClick({})
obj.instance().objectToCSVRow(
    {
        'GT_RowId': 1059,
        'title': 'Test 1059st row',
        'id': 1059,
        'desc': 'Lorem Ipsum is simply dummy 1447 text of the printing and typesetting',
        'info': 'some info some info some info some info',
        'date': '15:28:06 01:05:2018',
        'field1': 29,
        'field2': 2293,
        'field3': 13404
    }
)