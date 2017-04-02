import React from 'react';
import renderer from 'react-test-renderer';
import Tools from '../../src/components/Button.js'

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

it('renders correctly', () => {
  const tree = renderer.create(
    <Tools
    defaultPerPage="100"
    display="bottom"
    lang="en"
    perPage="50"
    perPageRows={[25, 50, 100, 200]}
    search=""
    selectedRows={[]}
    struct={{
      search: ['top', 'bottom'],
      rowsSelector: ['desc', 'top', 'bottom'],
      pagination: ['bottom']
    }}
    tableOpts={{
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
    }}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
