import React from 'react'
import renderer from 'react-test-renderer'
import Tools from '../../../src/components/tools/Tools.js'

const editor = {
    ajax: 'http://gigatables.loc/editor.php',
    ajaxFiles: 'uploadFiles.php',
    struct: {
        buttons: [ 'top', 'bottom' ] // buttons
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
                { 'key1': 'val1' },
                { 'key2': 'val2' }
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
            attrs: [
                { 'pattern': '^[A-Za-z0-9_]+$' }
            ]
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

it('renders Tools correctly', () => {
    const tree = renderer.create(
        <Tools
            defaultPerPage={100}
            display="bottom"
            lang="en"
            perPage={50}
            perPageRows={[ 25, 50, 100, 200 ]}
            search=""
            selectedRows={[]}
            struct={{
                search: [ 'top', 'bottom' ],
                rowsSelector: [ 'desc', 'top', 'bottom' ],
                pagination: [ 'bottom' ],
                download: {
                    csv: true
                },
            }}
            tableOpts={{
                buttons: [
                    { // reload button to fetch content manually
                        extended: 'editor_reload',
                        editor: editor,
                        triggerAfter: (() => {
                            console.log('after reload')
                        }), triggerBefore: (() => {
                            console.log('before reload')
                        })
                    },
                    {// to set CSV Download button
                        extended: 'editor_csv',
                        editor: editor
                    },
                    {
                        extended: 'editor_create', editor: editor, triggerAfter: (function () {
                            console.log('after create')
                        }), triggerBefore: (function () {
                            console.log('before create')
                        })
                    },
                    {
                        extended: 'editor_edit', editor: editor, triggerBefore: (function () {
                            console.log('before edit')
                        })
                    },
                    {
                        extended: 'editor_remove', editor: editor, triggerAfter: (function () {
                            console.log('after del')
                        })
                    }
                ],
                buttonsPosition: [ 'top', 'bottom' ],
                theme: 'std'
            }}
            updatePerPage={(e) => {}}
            doSearch={(e) => {}}
            jsonData={[{ "GT_RowId": 178, "title": "Test 178st row", "id": 178, "desc": "Lorem Ipsum is simply dummy 7241 text of the printing and typesetting", "info": "some info some info some info some info", "date": "22:00:22 10:05:2018", "field1": 86, "field2": 1412, "field3": 12523 },
                { "GT_RowId": 91, "title": "Test 91st row", "id": 91, "desc": "Lorem Ipsum is simply dummy 8606 text of the printing and typesetting", "info": "some info some info some info some info", "date": "22:01:49 10:05:2018", "field1": 23, "field2": 1325, "field3": 12436 },
                { "GT_RowId": 382, "title": "Test 382st row", "id": 382, "desc": "Lorem Ipsum is simply dummy 2673 text of the printing and typesetting", "info": "some info some info some info some info", "date": "21:56:58 10:05:2018", "field1": 97, "field2": 1616, "field3": 12727 }
                ]}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})

it('renders Tools with empty Search/PagesSelector', () => {
    const tree = renderer.create(
        <Tools
            defaultPerPage={100}
            display="left"
            lang="en"
            perPage={50}
            perPageRows={[ 25, 50, 100, 200 ]}
            search=""
            selectedRows={[]}
            struct={{
                search: [ 'top', 'bottom' ],
                rowsSelector: [ 'desc', 'top', 'bottom' ],
                pagination: [ 'bottom' ],
                download: {
                    csv: true
                },
            }}
            tableOpts={{
                buttons: [
                    { // reload button to fetch content manually
                        extended: 'editor_reload',
                        editor: editor,
                        triggerAfter: (() => {
                            console.log('after reload')
                        }), triggerBefore: (() => {
                            console.log('before reload')
                        })
                    },
                    {// to set CSV Download button
                        extended: 'editor_csv',
                        editor: editor
                    },
                    {
                        extended: 'editor_create', editor: editor, triggerAfter: (function () {
                            console.log('after create')
                        }), triggerBefore: (function () {
                            console.log('before create')
                        })
                    },
                    {
                        extended: 'editor_edit', editor: editor, triggerBefore: (function () {
                            console.log('before edit')
                        })
                    },
                    {
                        extended: 'editor_remove', editor: editor, triggerAfter: (function () {
                            console.log('after del')
                        })
                    }
                ],
                buttonsPosition: [ 'top', 'bottom' ],
                theme: 'std'
            }}
            updatePerPage={(e) => {}}
            doSearch={(e) => {}}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})
