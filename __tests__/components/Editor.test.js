import React from 'react';
import renderer from 'react-test-renderer';
import Editor from '../../src/components/form/Editor.js'
import { shallow } from 'enzyme';

var editor = {
  ajax: 'http://gigatables.loc/editor.php',
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
 struct: {
   search: ['top', 'bottom'],
   rowsSelector: ['desc', 'top', 'bottom'],
   pagination: ['bottom']
 },
 lang: 'en', // english default
 perPageRows: [25, 50, 100, 200],
 defaultPerPage: 100,
 ajax: 'http://gigatables.loc/gigatables.php',
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
     cISearch: true // default false
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
     data: "info"
   },
   {data:"field1"},
   {data:"field2"},
   {data:"field3", visible: false}
 ],
 columnOpts: [
   {
     render: (data, row, type) => (
       <div>
         <form method="post" action="">
          <input type="hidden" name="action" value="forms" />
          <input type="hidden" name="id" value={row.id} />
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
     {extended: "editor_create", editor: editor, triggerAfter: (function () {
         console.log('after create');
       }), triggerBefore: (function () {
         console.log('before create');
       })},
     {extended: "editor_edit", editor: editor, triggerBefore: (function () {
       console.log('before edit');
     })},
     {extended: "editor_remove", editor: editor, triggerAfter: (function () {
         console.log('after del');
       })}
   ],
   buttonsPosition: ['top', 'bottom'],
   theme: 'std'
 }
};

describe("Editor", () => {

beforeEach(() => {
  global.editorUpdate = jest.fn().mockImplementation((e, dataResp) => {

  });
  global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,
          Id: '123',
          json: function() {
            return {"rows":[
              {
                "GT_RowId":123,
                "title":"Test Bar 123st row",
                "id":123,
                "desc":"Lorem Ipsum is simply dummy Bar 7196 text of the printing and typesetting",
                "info":"some info some info some info some info",
                "date":"13:23:43 02:04:2017",
                "field1":123,
                "field2":1357,
                "field3":12468
              }
            ]};
          }
        });
      });
      return p;
  });
});

it('renders Editor correctly', () => {
  const tree = renderer.create(
    <Editor
    lang="en"
    action="create"
    countRows="229"
    fromRow="0"
    page="1"
    perPage="50"
    active={true}
    editor={editor}
    columns={editor.fields}
    struct={settings.struct}
    tableOpts={settings.tableOpts}
    selectedRows={[1]}
    selectedIds={[187]}
    fieldsEdit={{}} />
  ).toJSON();
  expect(tree).toMatchSnapshot();

  const obj = shallow(
    <Editor
    lang="en"
    countRows="229"
    fromRow="0"
    page="1"
    perPage="50"
    action="delete"
    active={true}
    editor={editor}
    columns={editor.fields}
    struct={settings.struct}
    tableOpts={settings.tableOpts}
    selectedRows={[1]}
    selectedIds={[187]}
    fieldsEdit={{}} />
  );

  obj.instance().setDataIndices({
    columns: settings.columns
  });

  obj.instance().setFields({
    action: 'create',
    editor: editor
  });

  obj.instance().setFields({
    action: 'edit',
    editor: editor
  });

  obj.instance().setFields({
    action: 'delete',
    editor: editor,
    selectedRows: [1, 2, 3]
  });

  obj.instance().triggerBefore({
    type: 'editor_create'
  });

  obj.instance().triggerAfter({
    type: 'editor_remove'
  });

  obj.instance().onChange({
    target: {
      name: 'foo',
      value: 'bar'
    }
  });

  obj.instance().stopPropagation({
    stopPropagation: () => {}
  });

  obj.instance().btnClicked({
    persist: () => {}
  });

  const objEdit = shallow(
    <Editor
    lang="en"
    countRows="229"
    fromRow="0"
    page="1"
    perPage="50"
    action="edit"
    active={true}
    editor={editor}
    columns={editor.fields}
    struct={settings.struct}
    tableOpts={settings.tableOpts}
    selectedRows={[1]}
    selectedIds={[187]}
    fieldsEdit={{}} />
  );

  objEdit.instance().btnClicked({
    persist: () => {}
  });

});

});
