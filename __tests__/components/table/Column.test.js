import React from 'react'
import renderer from 'react-test-renderer'
import Column from '../../../src/components/table/Column.js'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({adapter: new Adapter()})

const CommonConstants = require('../../../src/components/CommonConstants')

const editor = {
    ajax: 'http://gigatables.loc/editor.php',
    ajaxFiles: 'uploadFiles.php',
    struct: {
        buttons: ['top', 'bottom'] // buttons
    },
    fields: [
        {
            label: 'ID',
            name: 'id',
            type: 'hidden'
        },
        {// an example of using select - automatically selected if matches with data in table column
            label: 'Types:',
            name: 'types[]',
            values: [// if select,checkbox,radio etc types - need this pre-set structure of values
                {'key1': 'val1'},
                {'key2': 'val2'}
            ],
            type: 'checkbox' // select,checkbox,radio
//              attrs: [
//                {'multiple':true}
//              ]
        },
        {
            label: 'Article title:',
            name: 'title',
            type: 'text', // default, other: password, file, select, multiselect etc
            attrs: {pattern: '^[A-Za-z0-9_]+$'}
        },
        {
            label: 'Description:',
            name: 'desc',
            type: 'textarea'
        },
        {
            label: 'Date Time:',
            name: 'date',
            type: 'date'
        },
        {
            label: 'Image:',
            name: 'image',
            type: 'file'
        }
    ]
}

beforeEach(() => {
    global.editorUpdate = jest.fn().mockImplementation((e, dataResp) => {
    
    })
    global.fetch = jest.fn().mockImplementation(() => {
        var p = new Promise((resolve, reject) => {
            resolve({
                ok: true,
                Id: '123',
                json: function() {
                    return {
                        'rows': [
                            {
                                'GT_RowId': 123,
                                'title': 'Test Bar 123st row',
                                'id': 123,
                                'desc': 'Lorem Ipsum is simply dummy Bar 7196 text of the printing and typesetting',
                                'info': 'some info some info some info some info',
                                'date': '13:23:43 02:04:2017',
                                'field1': 123,
                                'field2': 1357,
                                'field3': 12468,
                                'consumers': [
                                    {
                                        'value': 79,
                                        'color': '#E38627'
                                    },
                                    {
                                        'value': 46,
                                        'color': '#C13C37'
                                    },
                                    {
                                        'value': 31,
                                        'color': '#6A2135'
                                    }
                                ]
                            }
                        ]
                    }
                }
            })
        })
        return p
    })
})

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
            dataIndex="editable-cells"
            editableCells={false}
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
            plugins={{
                data: 'field1',
                plugins: 'progressbar',
                pluginProps: {
                    height: 20
                }
            }}>12</Column>
    ).toJSON()
    expect(progressBar).toMatchSnapshot()
    // preventing polyfill errors
    window.requestAnimationFrame = setImmediate
    const pie = renderer.create(
        <Column
            count={0}
            dataIndex="editable-cells"
            editableCells={false}
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
            plugins={{
                data: 'consumers',
                plugins: 'pie',
                pluginProps: {
                    // ratio: 2,
                    // startAngle: 3,
                    // rounded: true,
                    animate: true
                    // radius: 33,
                }
            }}>{[
            {
                'value': 79,
                'color': '#E38627'
            },
            {
                'value': 46,
                'color': '#C13C37'
            },
            {
                'value': 31,
                'color': '#6A2135'
            }
        ]}</Column>
    ).toJSON()
    expect(pie).toMatchSnapshot()
    
    const trendy = renderer.create(
        <Column
            count={0}
            dataIndex="editable-cells"
            editableCells={false}
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
            plugins={{
                data: 'consumers_trend',
                plugins: 'trend',
                pluginProps: {}
            }}>{[
            20,
            62,
            46,
            65,
            74
        ]}</Column>
    ).toJSON()
    expect(trendy).toMatchSnapshot()
    // editable cells
    const editableCells = renderer.create(
        <Column
            count={0}
            dataIndex="editable-cells"
            editableCells={true}
            gteRowId={71}
            minRow="0"
            maxRow="0"
            cell={1}
            editCell={() => {}}
            editRow={() => {}}
            selectedRows={[]}
        >Foo Bar</Column>
    ).toJSON()
    expect(editableCells).toMatchSnapshot()
    
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
            selectedRows={[]}
            editor={editor}
            editorUpdate={(e, dataResp) => {}}
        >Lorem Ipsum is simply dummy Bar 725 text of the printing and typesetting</Column>
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
    obj.instance().btnClickedEnter({
        persist: () => {},
        keyCode: CommonConstants.ENTER_KEY,
        target: {
            dataset: {
                realid: 123
            }
        }
    })
    obj.instance().componentDidUpdate()
})
