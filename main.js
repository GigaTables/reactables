import React from 'react'
import ReactDOM from 'react-dom'
import Reactables from './src/Reactables.jsx'
import Header from './src/components/table/Header.js'
import './main.css'

let editor = {
    ajax: 'http://gigatables.loc/editor.php',
    // it is possible to set discrete urls, http methods for any type of request
    // ajax: {
    //     create: {
    //         url: 'http://gigatables.loc/editor.php',
    //         type: 'POST',
    //     },
    //     edit: {
    //         url: 'http://gigatables.loc/editor.php',
    //         type: 'PUT',
    //     },
    //     delete: {
    //         url: 'http://gigatables.loc/editor.php',
    //         type: 'DELETE',
    //     },
    // },
    ajaxFiles: 'http://gigatables.loc/uploadFiles.php',
    struct: {
        buttons: ['top', 'bottom'] // buttons
    },
    fields: [
        {
            label: "ID",
            name: "id",
            type: 'hidden'
        },
        {// an example of using select - automatically selected if matches with data in table column
            label: "Types:",
            name: "types[]",
            values: [// if select,checkbox,radio etc types - need this pre-set structure of values
                {'key1': 'val1'},
                {'key2': 'val2'}
            ],
            type: 'checkbox', // select,checkbox,radio
//              attrs: [
//                {'multiple':true}
//              ]
        },
        {
            label: "Article title:",
            name: "title",
            type: 'text', // default, other: password, file, select, multiselect etc
            fieldsetOpen: true,
            legend: 'Required fields',
            attrs: [
                {'pattern': '^[A-Za-z0-9_]+$'},
                {'className': 'titleField'}
            ]
        },
        {
            label: "Description:",
            name: "desc",
            type: 'textarea',
            plugins: 'rte',
            attrs: [
                {'className': 'descriptionField'}
            ],
            fieldsetClose: true,
        },
        {
            label: "Date Time:",
            name: "date",
            type: 'date'
        },
        {
            label: "Image:",
            name: "image",
            type: 'file'
        },
    ]
};

let settings = {
    struct: {
        search: ['top', 'bottom'],
        rowsSelector: ['desc', 'top', 'bottom'],
        pagination: ['bottom'],
        fixedHeader: false, // default false
        editableCells: true, // default false
        aggregateFooter: true, // default false
        download: {
            csv: false,
        },
    },
    lang: 'en', // english default
    perPageRows: [25, 50, 100, 200],
    defaultPerPage: 100,
    ajax: 'http://gigatables.loc/gigatables.php',
    // ajax: new Promise((resolve) => {
    //     resolve('http://gigatables.loc/gigatables.php')
    // }),
    // ajaxAutoloadData: true, // default false
    // ajaxAutoloadPeriod: 8, // sec
    requestType: 'GET',
    columns: [
        {// include all defaults
            data: "id",
            sortable: true, // true by defualt
            visible: true, // true by defualt
            searchable: true, // true by defualt
            discreteSearch: true, // false by default
            discreteSearchValue: function (title) {
                return 'Search by field - ' + title;
            }
        },
        {
            data: "title",
            cISearch: true, // default false
            footer: 'frequency',
        },
        {
            data: "desc",
            sortable: false,
            discreteSearch: true,
            discreteCISearch: true // default false
        },
        {
            data: "date",
            searchable: false
        },
        {
            data: "info",
        },
        {
            data: "field1",
            plugins: "progressbar",
        },
        {
            data: "field2",
            footer: "avg",
        },
        {data: "field3", visible: false}
    ],
    columnOpts: [
        {
            render: (data, row, type) => (
                <div>
                    <form method="post" action="">
                        <input type="hidden" name="action" value="forms"/>
                        <input type="hidden" name="id" value={row.id}/>
                        <div>{data}</div>
                    </form>
                </div>),
            target: 'title' // provide data column index to match opts
        },
        {
            render: (data, row, type) => (
                <div>
                    <div>{data}</div>
                    <div>{(row.id % 2 === 0) ? '**' : '*'}</div>
                </div>
            ),
            target: 'date'
        }
    ],
    tableOpts: {
        buttons: [
            // {// to set CSV Download button
            //     extended: "editor_csv",
            //     editor: editor,
            // },
            {
                extended: "editor_create", editor: editor, triggerAfter: (function () {
                    console.log('after create');
                }), triggerBefore: (function () {
                    console.log('before create');
                })
            },
            {
                extended: "editor_edit", editor: editor, triggerBefore: (function () {
                    console.log('before edit');
                })
            },
            {
                extended: "editor_remove", editor: editor, triggerAfter: (function () {
                    console.log('after del');
                })
            }
        ],
        buttonsPosition: ['top', 'bottom'],
        theme: 'std'
    }
};

ReactDOM.render(
    <Reactables editor={editor} settings={settings}>
        <Header data="id">ID</Header>
        <Header data="title">Name</Header>
        <Header data="desc">Description</Header>
        <Header data="date">Date</Header>
        <Header data="info">Info</Header>
        <Header data="field2">Field123 but data from field2</Header>
        <Header data="field1">Field1</Header>
        <Header data="field3">Field3 invisible</Header>
        <Header>Field3 invisible</Header>
    </Reactables>,
    document.getElementById('app'));
