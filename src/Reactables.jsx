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
      minRow: 0,
      maxRow: 0,
      opacity: 0,
      search: '',
      fieldsEdit: {}
    }
    // cols opts
    this.searchableCols = [];
    this.visibleCols = [];
    this.sortableCols = [];
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
    const { columns } = this.settings;
    columns.map((object, index) => {
      this.setSearchableCols(object, index);
      this.setSortableCols(object, index);
      // visibility must be the last - it unsets search & sort if false
      this.setVisibleCols(object, index);
    });
    fetch(this.settings.ajax).then(response => response.json())
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
      }
    });
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
      }
    });
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
            <Tools
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
              struct={struct} />
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
            <Pagination
              updatePagination={this.handlePagination.bind(this)}
              countRows={countRows}
              page={page}
              perPage={perPage}
              fromRow={fromRow}
              lang={lang} />
          </div>
          <div className={styles.gt_foot_tools}>
            <Tools
              updatePerPage={this.updatePerPage.bind(this)}
              showPopup={this.showPopup.bind(this)}
              doSearch={this.doSearch.bind(this)}
              tableOpts={tableOpts}
              perPageRows={perPageRows}
              perPage={perPage}
              defaultPerPage={defaultPerPage}
              lang={lang}
              selectedRows={selectedRows}
              search={search} />
          </div>
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
            tableOpts={tableOpts} />
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
