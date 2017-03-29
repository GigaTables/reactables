import React from 'react'
import Main from './components/Main.js'
import Tools from './components/Tools.js'
import Editor from './components/Editor.js'
import Pagination from './components/Pagination.js'
import styles from './css/styles.css'
import { DataException } from './components/Exceptions';

var CommonConstants = require('./components/CommonConstants');
var loAssign = require('lodash/assign');

class Reactables extends Main {
  constructor(props)
  {
    super(props);
    this.state = {
      dataRows:null,
      countRows:0,
      perPage:50,
      page:1,
      fromRow:0,
      dataSearch:null,
      sortButtons:[],
      action: 'create', // optimized - not importing EditorConstants
      active: false,
      selectedRows: [],
      selectedIds: [],
      ctrlDown: false,
      shiftDown: false,
      arrowDown: false,
      arrowUp: false,
      arrowLeft: false,
      arrowRight: false,
      minRow: 0,
      maxRow: 0,
      opacity: 0,
      search: '',
      fieldsEdit: {},
      columnsSearch: {},
      discreteFocus: false
    }
    // cols opts
    this.searchableCols = [];
    this.searchableCase = [];
    this.discreteSearchableCase = [];
    this.visibleCols = [];
    this.sortableCols = [];
    this.customColumns = [];
    this.lastTimeKeyup = (new Date()).getTime(), this.nowMillis = 0;
    // these default sets will merge with users sets
    this.defaultSettings = {
      struct: {
        search: ['top', 'bottom'],
        rowsSelector: ['asc', 'top', 'bottom'],
        pagination: ['bottom']
      },
      lang: 'en',
      perPageRows: [25, 50, 100, 200, 500],
      defaultPerPage: 25,
      columns: [],
      columnOpts: [],
      tableOpts: {
          buttons: [],
          theme: 'std'
      }
    };
    this.build();
  }

  build()
  {
    this.settings = loAssign({}, this.defaultSettings, this.props.settings);
    const { columns, columnOpts } = this.settings;
    columns.map((object, index) => {
      this.setSearchableCols(object);
      this.setSearchableCase(object);
      this.setSortableCols(object);
      // visibility must be the last - it unsets search & sort if false
      this.setVisibleCols(object);
    });
    if (typeof columnOpts !== CommonConstants.UNDEFINED) {
      columnOpts.map((object, index) => {
        this.setCustomColumns(object);
      });
    }
    fetch(this.settings.ajax).then((response) =>
    {// set ajax loader fo BD
      this.setLoader(columns.length);
      return response.json();
    })
    .then((data) => {
      let jsonData = data['rows'] ? data['rows'] : data['row']; // one row or several
      if (typeof jsonData === CommonConstants.UNDEFINED) {
        throw new DataException('JSON must contain "rows" field.');
      }
      this.jsonData = jsonData;
      this.createTable(jsonData);
      this.setTableSort();
    });
  }

  componentDidMount()
  {
    var that = this;
    // enabling keys
    document.addEventListener('keydown', (e) => {
      switch (e.which) {
        case CommonConstants.CTRL_KEY:
          that.setState({
            ctrlDown: true
          });
          break;
        case CommonConstants.CTRL_KEY_MAC_CHROME:
          that.setState({
            ctrlDown: true
          });
          break;
        case CommonConstants.CTRL_KEY_MAC_FF:
          that.setState({
            ctrlDown: true
          });
          break;
        case CommonConstants.SHIFT_KEY:
          that.setState({
            shiftDown: true
          });
          break;
        case CommonConstants.ESCAPE_KEY:
          that.hidePopup();
          break;
        case CommonConstants.ARROW_UP:
          that.setState({
            arrowUp: true
          });
          break;
        case CommonConstants.ARROW_DOWN:
          that.setState({
            arrowDown: true
          });
          break;
        case CommonConstants.ARROW_LEFT:
          that.setState({
            arrowLeft: true
          });
          break;
        case CommonConstants.ARROW_RIGHT:
          that.setState({
            arrowRight: true
          });
          break;
        case CommonConstants.A_KEY:
          that.setState({
            aDown: true
          });
          break;
      }
      that.addSelectedRows();
      that.setPagination();
    });
    // disabling keys
    document.addEventListener('keyup', (e) => {
      switch (e.which) {
        case CommonConstants.CTRL_KEY:
          that.setState({
            ctrlDown: false
          });
          break;
        case CommonConstants.CTRL_KEY_MAC_CHROME:
          that.setState({
            ctrlDown: false
          });
          break;
        case CommonConstants.CTRL_KEY_MAC_FF:
          that.setState({
            ctrlDown: false
          });
          break;
        case CommonConstants.SHIFT_KEY:
          that.setState({
            shiftDown: false
          });
          break;
        case CommonConstants.ARROW_UP:
          that.setState({
            arrowUp: false
          });
          break;
        case CommonConstants.ARROW_DOWN:
          that.setState({
            arrowDown: false
          });
          break;
        case CommonConstants.ARROW_LEFT:
          that.setState({
            arrowLeft: false
          });
          break;
        case CommonConstants.ARROW_RIGHT:
          that.setState({
            arrowRight: false
          });
          break;
        case CommonConstants.A_KEY:
          that.setState({
            aDown: false
          });
          break;
      }
    });
  }

  getTools(display)
  {
    const {
      selectedRows,
      search,
      perPage
    } = this.state;

    const {
      tableOpts,
      perPageRows,
      defaultPerPage,
      lang,
      struct
    } = this.settings;

    return (<Tools
      updatePerPage={this.updatePerPage.bind(this)}
      showPopup={this.showPopup.bind(this)}
      doSearch={this.doSearch.bind(this)}
      tableOpts={tableOpts}
      perPageRows={perPageRows}
      perPage={perPage}
      defaultPerPage={defaultPerPage}
      lang={lang}
      selectedRows={selectedRows}
      search={search}
      struct={struct}
      display={display} />)
  }

  getEditor(display)
  {
    const { editor } = this.props;
    const {
      active,
      action,
      selectedRows,
      selectedIds,
      countRows,
      page,
      opacity,
      popup_button,
      popup_title,
      search,
      fieldsEdit
    } = this.state;

    const {
      tableOpts,
      lang,
      struct
    } = this.settings;

    return (
      <Editor
        active={active}
        action={action}
        editor={editor}
        columns={editor.fields}
        editorUpdate={this.editorUpdate.bind(this)}
        selectedRows={selectedRows}
        selectedIds={selectedIds}
        fieldsEdit={fieldsEdit}
        opacity={opacity}
        popupButton={popup_button}
        popupTitle={popup_title}
        hidePopup={this.hidePopup.bind(this)}
        lang={lang}
        struct={struct}
        display={display}
        tableOpts={tableOpts} />
    )
  }

  getPagination(display)
  {
    const {
      lang,
      struct
    } = this.settings;

    if (struct.pagination.indexOf(display) === -1) {
      return '';
    }
    const {
      selectedIds,
      countRows,
      page,
      perPage,
      fromRow
    } = this.state;

    return (<Pagination
      updatePagination={this.handlePagination.bind(this)}
      countRows={countRows}
      page={page}
      perPage={perPage}
      fromRow={fromRow}
      lang={lang} />)
  }

  render() {
      let sortedCols = this.setHeads();
      // ==== settings
      const {
        tableOpts,
        perPageRows,
        defaultPerPage,
        lang,
        struct
      } = this.settings;
      // ==== settings ===
      const { editor } = this.props;
      const {
        dataRows,
        active,
        action,
        selectedRows,
        selectedIds,
        countRows,
        page,
        opacity,
        perPage,
        fromRow,
        popup_button,
        popup_title,
        search,
        fieldsEdit
      } = this.state;
      return (
        <div className={styles.gt_container} style={{width: "1128px"}}>
          <div className={styles.gt_head_tools}>
            {this.getTools(CommonConstants.DISPLAY_TOP)}
          </div>
          <div className={styles.gt_pagination}>
            {this.getPagination(CommonConstants.DISPLAY_TOP)}
          </div>
          <table id="gigatable" className={styles.gigatable}>
            <thead className={styles.gt_head}>
              <tr className={styles.gt_head_tr}>
                {sortedCols}
              </tr>
            </thead>
            <tbody className={styles.gt_body}>
                {dataRows}
            </tbody>
            <tfoot className={styles.gt_foot}>
              <tr>
                {sortedCols}
              </tr>
            </tfoot>
          </table>
          <div className={styles.gt_pagination}>
            {this.getPagination(CommonConstants.DISPLAY_BOTTOM)}
          </div>
          <div className={styles.gt_foot_tools}>
            {this.getTools(CommonConstants.DISPLAY_BOTTOM)}
          </div>
          {this.getEditor()}
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
