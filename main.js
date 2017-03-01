import React from 'react'
import ReactDOM from 'react-dom'
import Reactables, {Header} from './src/Reactables.jsx'

var editor = {
  ajax: 'editor.php',
  ajaxFiles: 'uploadFiles.php',
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
      attrs: [
        {'pattern': '^[A-Za-z0-9_]+$'}
      ]
    },
    {
      label: "Description:",
      name: "desc",
      type: 'textarea'
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

var settings = {
 struct: {// all in
   search: ['top', 'bottom'],
   rowsSelector: ['asc', 'top', 'bottom'],
   pagination: ['bottom']
 },
 lang: 'en', // english default
 perPageRows: [25, 50, 100, 200, 500],
 defaultPerPage: 50,
 ajax: 'http://gigatables.loc/gigatables.php',
 requestType: 'GET',
 columns: [
   {// include all defaults
     data: "id",
     sortable: true,
     visible: true,
     searchable: true,
     discreteSearch: true, // false by default
     discreteSearchValue: function (title) {
       return 'Поиск по полю ' + title;
     }
   },
//            {data: "title"},
   {data: "desc", sortable: false},
   {
     data: "date",
     searchable: false
   },
   {
     data: "info",
     //              visible: false
   },
   {data:"field1"},
   {data:"field2"},
   {data:"field3"}
 ],
 columnOpts: [
   {
     render: function (data, row, type) {
       return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
     },
     target: 2
   },
   {
     render: function (data, row, type) {
       return '<div><form method="post" class="accForm" action=""><input type="hidden" name="action" value="forms" /><input type="hidden" name="id" value="' + row.id + '" /><div>' + data + '</div></form></div>';
     },
     target: 3
   }
 ],
 tableOpts: {
   buttons: [
     {extended: "editor_create", editor: editor, triggerAfter: (function () {
         console.log('after create');
       }), triggerBefore: (function () {
         console.log('before create');
       })},
     {extended: "editor_edit", editor: editor},
     {extended: "editor_remove", editor: editor, triggerAfter: (function () {
         console.log('after del');
       })}
   ],
   buttonsPosition: ['top', 'bottom'],
   theme: 'std'
 }
};

ReactDOM.render(
  <Reactables editor={editor} settings={settings}>
    <Header>ID</Header>
    <Header>Name</Header>
    <Header>Description</Header>
    <Header>Date</Header>
    <Header>Info</Header>
    <Header>Field2</Header>
    <Header>Field3</Header>
  </Reactables>,
  document.getElementById('app'))
