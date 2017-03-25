[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/GigaTables/reactables/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/GigaTables/reactables/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/GigaTables/reactables/badges/build.png?b=master)](https://scrutinizer-ci.com/g/GigaTables/reactables/build-status/master)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
# GigaTables ReactJS plug-in
GigaTables supports the following capabilities:

-- ajax data processing/editing (CRUD),

-- pagination,

-- cross-sorting,

-- common search (through all columns),

-- discrete (per column) search,

-- shft/ctrl rows selection,

-- trigger functions,

-- 7 popular languages

and more...

* [Installation](#user-content-installation)
* [Few screen-shots](#user-content-few-screen-shots)
* [Installation based on browser script implementation](#user-content-installation-based-on-browser-script-implementation-which-u-can-download-from-build-dir)
* [Getting Started](#user-content-getting-started)
  * [Minimal configuration](#user-content-minimal-configuration)
  * [Advanced configuration with opts and editor](#user-content-advanced-configuration-with-opts-and-editor)  
* [An example of using GigaTables with Editor tool](#user-content-an-example-of-using-gigatables-with-editor-tool)
* [FAQ](#user-content-faq)

### Installation

- npm i gigatables-react

After installation will be completed add import to your `main.js` like this:

```JS
import { Reactables, Header } from 'gigatables-react'
```

see how to create table with JSX bellow.
## Few screen-shots

### Multiple select with Ctrl and Shift
![alt tag](https://raw.githubusercontent.com/GigaTables/gigatables/master/GigaTables_basic_view.png)

### CRUD pop-ups
![alt tag](https://raw.githubusercontent.com/GigaTables/gigatables/master/GigaTables_edit_item.png)

## Installation based on browser script implementation (which U can download from build/ dir)
```HTML
    <script src="build/index.js"></script>
    // or
    <script src="wherever/whatever.js"></script>
```

## Getting Started

To initialize plug-in and to bind GigaTables with table structure - set settings prop with options and table structure in JSX format.
The `<Reactables>` tag, it's `Headers` and all the stuff like pagination, per page selector will be constructed on the fly.

### Minimal configuration

```JS

        var settings = {
          struct: {// all in
            search: ['top', 'bottom'],
            rowsSelector: ['asc', 'top', 'bottom'],
            pagination: ['bottom']
          },
          ajax: 'http://example.com/your/tabledata',
          columns: [
            {data: "id"},
            {data: "desc"},
            {data: "title"},
            {data: "date"},
            {data: "types"},
            {data: "info"}
          ]
        };   

```

### Advanced configuration with opts and editor

```JS
var settings = {
 struct: {
   search: ['top', 'bottom'],
   rowsSelector: ['asc', 'top', 'bottom'],
   pagination: ['bottom']
 },
 lang: 'en', // english default
 perPageRows: [25, 50, 100, 200, 500],
 defaultPerPage: 50,
 ajax: 'https://example.com/your/tabledata',
 requestType: 'GET',
 columns: [
   {// include all defaults
     data: "id",
     sortable: true, // true by defualt
     visible: true, // true by defualt
     searchable: true, // true by defualt
     discreteSearch: true, // false by default
     discreteSearchValue: function (title) {
       return 'Поиск по полю ' + title;
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
```        

The table is defined like in example below:

```JSX
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
  document.getElementById('app'))
```

data attribute is needed to glue columns to json data steadily.

JSON structure to return from provided url in "ajax" GigaTables option:

```JS
{
    "rows": [
        {
            "GT_RowId": 2, // optional
            "id": 2, // if there is no GT_RowId - try to fetch "id"
            "title": "Test 2st row",
            "desc": "<input type=\"text\" name=\"ttl\" value=\"Test 2nd row Test 2nd row Test 2nd row
 Test 2st row Test 2st row\" \/> ",
            "date": "20:40:37 17:06:2015",
            "info": "some info some info some info some info"
        },
        {
            "GT_RowId": 1,
            "id": 1,
            "title": "Test 1st row",
            "desc": "<input type=\"text\" name=\"ttl\" value=\"Test 1st row Test 1st row Test 1st row
 Test 1st row Test 1st row\" \/> ",
            "date": "20:40:38 17:06:2015",
            "info": "some info some info some info some info"
        }, ...

```

## An example of using GigaTables with Editor tool

First of all You should define an object Editor like this:

```JS
var editor = {
  ajax: 'https://example.com/update/tabledata',
  ajaxFiles: 'https://example.com/upload/files',
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
```        

and then pass variable (in this case - editor) to GigaTables main options in tableOpts section like this:
```JS
          tableOpts: {
            buttons: [
              {extended: "editor_create", editor: editor},
              {extended: "editor_edit", editor: editor},
              {extended: "editor_remove", editor: editor}
            ],
            buttonsPosition: ['top', 'bottom'],
            theme: 'std'
          }
```

That's it then You will be able to CRUD any record You want :-)

## FAQ

**Can I use file types in GT editor to upload files through AJAX on server?**

Sure, it can be done by this additional option in editor:

```JS
ajaxFiles: 'uploadFiles.php',
```

wich is point on script on the server where it should upload the file(s).

And to add the actual field which will send the file to the server script:
```JS
            {
              label: "Image:",
              name: "image",
              type: 'file'
            }
```
Ensure that the field is in *fields: [* option.

**What types of fields can be used in editor?**

Any, really - You can use any HTML5 types, they are already embedded, but responsibility of supported ones (in different Browsers)
is on Your side.

**Can I choose more then one row?**

Yes, U can even choose not only the bunch of rows, but several bunches and some between them, by manipulating with:
Ctrl+Left click (one row anywhere) and Shift+Left click (several rows).

**Can I sort columns content?**

Defenitelly, also it is simple enough to sort them jointly.

**What does search field mean?**

The main search field above (which is the default state, U can make it visible in the bottom) is useful for searching through all columns.

**Is it possible to search for a particular column in GT?**

Yes it is, U can specify any column U wanted to search by setting these options in *columns* parts eg.:

```JS
          columns: [
            {// include all defaults
              data: "id",
              discreteSearch: true,
              discreteSearchValue: function(title) {
                return 'Search on the field - ' + title;
              }              
            }
```

additionally U may want to set a custom placeholder - it is possible via *discreteSearchValue* option.

**Is there languages support?**

Sure, You can pick one of 7 languages: English, German, Russian, French, Spanish, Chinese, Hindi - en, gr, ru, fr, es, ch, hi respectively.   

**Does GT have any event-triggered functions, ex.: to run something before/after pop-up?**

GigaTables plug-in has 2 types of triggers **triggerBefore** and **triggerAfter** which can be applied to any action button - Create, Edit or Delete.

** Can I set case insensitive search to either common and/or discrete search? **

Yes. For common search You should choose for which particular column it is needed and place `cISearch: true` option there,
for discrete search use `discreteCISearch: true`.
