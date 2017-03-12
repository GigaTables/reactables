import React from 'react'
import ReactDOM from 'react-dom'
import Tools from './components/Tools.js'
import Editor from './components/Editor.js'
import Row from './components/Row.js'
import Column from './components/Column.js'
import Pagination from './components/Pagination.js'
import classNames from 'classnames/bind';
import styles from './css/styles.css'
import {DataException} from './components/Exceptions';

var CommonConstants = require('./components/CommonConstants');
var EditorConstants = require('./components/EditorConstants');
var Lang = require('./components/Lang');

export class Header extends React.Component {
  render() {
    let sorting = this.props.gteSort === CommonConstants.SORTABLE,
    // 0 - default data-direction, 1 - asc, -1 - desc
    desc = (this.props.sortDirection === -1) ? true : false,
    asc = (this.props.sortDirection === 1) ? true : false;
    let thClasses = classNames({
      gt_head_tr_th: true,
      sorting: sorting ? true : false,
      sorting_desc: desc,
      sorting_asc: asc
    });
    return (
      <th onClick={this.props.updateSort} className={thClasses} data-sortindex={this.props.sortId}
      data-direction={this.props.sortDirection}
      style={(sorting) ? {cursor:"pointer"} : {cursor:"default"}}>
        <div className={styles.gt_th_box}>{this.props.children}</div>
      </th>
    )
  }
}

class Reactables extends React.Component {
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
      action: EditorConstants.ACTION_CREATE,
      active: false,
      selectedRows: [],
      selectedIds: [],
      ctrlDown: false,
      shiftDown: false,
      minRow: 0,
      maxRow: 0,
      opacity: 0
    }
    // cols opts
    this.searchableCols = [];
    this.visibleCols = [];
    this.sortableCols = [];
    this.build();
  }

  getButtonsState(indexData, value)
  {
    const { sortButtons } = this.state;
    let buttons = [];
    for (let key in sortButtons) {
      buttons[key] = sortButtons[key];
      if (key === indexData) {
        buttons[key] = value;
      }
    }
    console.log(buttons, 666);
    return buttons;
  }

  setTableSort(indexData, e)
  {
    const { columns } = this.props.settings;
    if (typeof e === CommonConstants.UNDEFINED) { // on start-up - setting default
      let sortedButtons = [];
      this.props.children.map((th, index) => {
        const { data } = th.props;
        if(typeof data !== CommonConstants.UNDEFINED) {
          columns.map((column, colIdx) => {
            // console.log(column[CommonConstants.DATA], data);
            if(column[CommonConstants.DATA] === data
              && (typeof column[CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
                || column[CommonConstants.SORTABLE] === true)) {
              sortedButtons[data] = 0; // 0 - none, 1 - asc, -1 - desc
            }
          });
        }
      });
      // console.log(sortedButtons);
      this.setState({
        sortButtons : sortedButtons
      });
    } else { // clicked
      this.props.children.map((th, idx) => {
        var that = this;
        const { sortButtons } = that.state;
        const { data } = th.props;

        let cols = columns,
        sJson = that.jsonData,
        sortedButtons = [];
        // check and sort for other columns
        if (typeof sortButtons[data] !== CommonConstants.UNDEFINED
          && sortButtons[data] !== 0
          && data !== indexData) {
            if (sortButtons[data] === 1) {
              sJson = this.sortAsc(data, sJson);
            } else {
              sJson = this.sortDesc(data, sJson);
            }
        }

        if (indexData === data) { // iff the cols match
          console.log(indexData, data);
          if (sortButtons[data] === 1) {
            sortedButtons = that.getButtonsState(indexData, -1);
            sJson = this.sortDesc(data, sJson);
          } else { // if 0 || -1 = 1
            sortedButtons = that.getButtonsState(indexData, 1);
            sJson = this.sortAsc(data, sJson);
          }
          that.createTable(sJson, sortedButtons);
        }
      });
    }
  }

  sortAsc(data, sJson)
  {
    let check = 0, isNan = 0;
    sJson.sort(function (a, b) {
      var an = eval('a.' + data), bn = eval('b.' + data);
      a = (an === null) ? '' : an + '';
      b = (bn === null) ? '' : bn + '';
      // console.log(a, b);
      if (check === 0) { // check just the 1st time
        if (isNaN(a - b)) {
          isNan = 1;
        }
        check = 1;
      }
      if (isNan) {
        return a.localeCompare(b);
      }
      return a - b;
    });
    return sJson;
  }

  sortDesc(data, sJson)
  {
    let check = 0, isNan = 0;
    sJson.sort(function (a, b) {
      var an = eval('a.' + data), bn = eval('b.' + data);
      a = (an === null) ? '' : an + '';
      b = (bn === null) ? '' : bn + '';
      if (check === 0) { // check just the 1st time
          if (isNaN(a - b)) {
              isNan = 1;
          }
          check = 1;
      }
      if (isNan) {
          return b.localeCompare(a);
      }
      return b - a;
    });
    return sJson;
  }

  doSearch(e)
  {
    let val = e.target.value,
    len = val.length,
    nothing = false;

    if (len > 0 || (len === 0 && val === '')) { // do search
      if (nothing === true && val === '') {
          return; // exit - user pressed not a symbol keys or teared down
      }
      if (nothing === false && val === '') { // rebuild full table if teared down
          this.createTable(this.jsonData, this.state.sortedButtons);
          nothing = true;
          return;
      }
      var nJson = [], str = '', i = 0, json = this.jsonData;
      for (let key in json) {
          for (let k in json[key]) {
              if (k !== CommonConstants.GT_ROW_ID && this.searchableCols[k] === true) { // do not search unsearchable
                  str = json[key][k] + '';
                  if (str.indexOf(val) !== -1) {
                      nJson[i] = json[key];
                      ++i;
                      break;
                  }
              }
          }
      }
      this.createTable(nJson, this.state.sortedButtons, this.state.selectedRows);
    }
  }

  setSearchableCols(object)
  {
    this.searchableCols[object[CommonConstants.DATA]] = false;
    if(typeof object[CommonConstants.SEARCHABLE] === CommonConstants.UNDEFINED
    || object[CommonConstants.SEARCHABLE] === true) {
      this.searchableCols[object[CommonConstants.DATA]] = true;
    }
  }

  setVisibleCols(object)
  {
    this.visibleCols[object[CommonConstants.DATA]] = true;
    if(typeof object[CommonConstants.VISIBLE] !== CommonConstants.UNDEFINED
    && object[CommonConstants.VISIBLE] === false) {
      this.visibleCols[object[CommonConstants.DATA]] = false;
      this.sortableCols[object[CommonConstants.DATA]] = false;
      this.searchableCols[object[CommonConstants.DATA]] = false;
    }
  }

  setSortableCols(object)
  {
    this.sortableCols[object[CommonConstants.DATA]] = false;
    if(typeof object[CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
    || object[CommonConstants.SORTABLE] === true) {
      this.sortableCols[object[CommonConstants.DATA]] = true;
    }
  }

  build()
  {
    const { columns } = this.props.settings;
    columns.map((object, index) => {
      this.setSearchableCols(object, index);
      this.setSortableCols(object, index);
      // visibility must be the last - it unsets search & sort if false
      this.setVisibleCols(object, index);
    });
    fetch(this.props.settings.ajax).then(response => response.json())
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

  createTable(jsonData, sortedButtons, selectedRows)
  {
    const {
      dataSearch,
      perPage,
      fromRow,
      minRow,
      maxRow
    } = this.state;
    let rows = [];
    if (dataSearch !== null) {
      jsonData = dataSearch;
    }
    let jsonDataPerPage = jsonData;
    if (jsonData.length > perPage) {
      let from = parseInt(fromRow),
      to = from + parseInt(perPage);
      jsonDataPerPage = jsonData.slice(from, to);
    }
    // process rows
    jsonDataPerPage.map((object, objectIndex) => {
        let cols = [], rowId = 0;
        rowId = this.getRowId(object);
        // process cols
        this.props.children.map((th, idx) => {
          const { data } = th.props;
        // this.props.settings.columns.map((column, index) => {
          // check if a JSON object has this data field + visible
          if(typeof data !== CommonConstants.UNDEFINED && this.visibleCols[data] === true) {
            cols.push(<Column
              dataIndex={data}
              selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
              minRow={minRow}
              maxRow={maxRow}
              count={objectIndex}
              gteRowId={rowId}
              key={idx}>{object[data]}</Column>);
          }
        });
        // count is used to shft key + click selection of rows, ex.: sorted
        rows.push(<Row
          clickedRow={this.clickedRow.bind(this)}
          selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
          minRow={minRow}
          maxRow={maxRow}
          key={objectIndex}
          count={objectIndex}
          gteRowId={rowId}>{cols}</Row>);
    });
    let state = {
      dataRows:rows,
      countRows:jsonData.length
    };
    if(typeof sortedButtons !== CommonConstants.UNDEFINED) {
      state['sortButtons'] = sortedButtons;
    }
    this.setState(state);
  }

  getRowId(object)
  {
    let rowId = 0;
    // perform id check
    if(typeof object[CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
        rowId = object[CommonConstants.GT_ROW_ID];
    } else if (typeof object['id'] !== CommonConstants.UNDEFINED) {
        rowId = object['id'];
    } else {
        throw new DataException('You have neither "GT_RowId" nor "id" in json structure.');
    }
    return rowId;
  }

  editorUpdate(e, dataIndices)
  {
    let action = e.target.dataset.action,
    rowId = 0,
    selectedRows = this.state.selectedRows;

    if (action === EditorConstants.ACTION_DELETE) {
      for (var dataKey in dataIndices) {
        for (var key in this.jsonData) {
          if(typeof this.jsonData[key][CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
              rowId = this.jsonData[key][CommonConstants.GT_ROW_ID];
          } else if (typeof this.jsonData[key]['id'] !== CommonConstants.UNDEFINED) {
              rowId = this.jsonData[key]['id'];
          }
          if (dataIndices[dataKey] === rowId) {
            selectedRows.splice(selectedRows.indexOf(key), 1);
            this.jsonData.splice(key, 1);
          }
        }
      }
    } else if (action === EditorConstants.ACTION_CREATE) {
      this.jsonData.unshift(dataIndices);
    } else if (action === EditorConstants.ACTION_EDIT) {
      for (var key in dataIndices) {
        this.jsonData[this.state.selectedRows[0]][key] = dataIndices[key];
      }
    }
    this.createTable(this.jsonData, this.state.sortedButtons);
    this.setState({
      selectedRows: selectedRows
    });
    this.hidePopup();
  }

  clickedRow(e)
  {
    const {
      selectedRows,
      selectedIds,
      sortedButtons,
      ctrlDown,
      shiftDown
    } = this.state;
    const { rowid, realid } = e.target.dataset;

    let rows = selectedRows,
    ids = selectedIds;
    let min = 0, max = 0,
    rowId = parseInt(rowid),
    realId = parseInt(realid);

    if (rows.length > 0 && rows.indexOf(rowId) !== -1
      && ctrlDown === false) { // if row is active - remove it
      rows = rows.splice(rowId, 1);
      ids = ids.splice(realId, 1);
      this.state.selectedRows = rows;
      this.state.selectedIds = ids;
    } else {
      if (ctrlDown === true) {
        rows.push(parseInt(rowid));
        ids.push(parseInt(realid));
      } else if (shiftDown === true) {
        rows.push(parseInt(rowid));
        ids.push(parseInt(realid));
        min = rows[0], max = rows[0];
        for (var row in rows) {
          if (rows[row] < min) {
            min = rows[row];
          }
          if (rows[row] > max) {
            max = rows[row];
          }
        }
        rows = [], this.state.selectedRows = [];
        // fill in the items
        for (var i = min; i <= max;++i) {
          rows.push(i);
        }
        this.state.selectedRows = rows;
      } else { // if just a click override prev
        rows = [parseInt(rowid)];
        ids = [parseInt(realid)];
      }
    }
    // we can't use the state for selectedRows here because of state latency
    this.createTable(this.jsonData, sortedButtons, rows);
    this.setState({
      selectedRows: rows,
      selectedIds: ids
    });
  }

  handlePagination(e)
  {
    const { from } = e.target.dataset;
    const { perPage, sortedButtons } = this.state;
    this.setState({
      fromRow: from,
      page: from / perPage + 1,
      selectedRows: [],
      selectedIds: []
    }, () => {this.createTable(this.jsonData, sortedButtons)});
  }

  updatePerPage(e)
  {
    this.setState({
        perPage: e.target.value
      }, () => {this.createTable(this.jsonData, this.state.sortedButtons)});
  }

  showPopup(e)
  {
    this.lang = Lang[this.props.settings.lang];
    let action = e.target.dataset.action,
    popup_title = this.lang.gte_editor_popupheader_create,
    popup_button = this.lang.gte_editor_sendbtn_create;

    if (action === EditorConstants.ACTION_EDIT) {
      popup_title = this.lang.gte_editor_popupheader_edit;
      popup_button = this.lang.gte_editor_sendbtn_update;
    } else if (action === EditorConstants.ACTION_DELETE) {
      popup_title = this.lang.gte_editor_popupheader_delete;
      popup_button = this.lang.gte_editor_sendbtn_delete;
    }
    e.preventDefault();
    this.setState({
      action: action,
      active: true,
      popup_title: popup_title,
      popup_button: popup_button,
      opacity: 1
    });
  }

  hidePopup()
  {
    this.setState({
      active: false
    });
  }

  setHeads()
  {
    const { sortButtons } = this.state;
    const { columns } = this.props.settings;
    let sortedCols = [];

    this.props.children.map((th, index) => {
    const { data } = th.props;
    if (typeof data !== CommonConstants.UNDEFINED
        && this.visibleCols[data] === true) {
      var thh = React.Children.only(th);
      var clonedOpts = {
        key: index,
        sortId: index+'',
        sortDirection: (typeof sortButtons[data] === CommonConstants.UNDEFINED) ? sortButtons[data] : 0
      };
        if (this.sortableCols[data] === true) {
          clonedOpts['gteSort'] = CommonConstants.SORTABLE;
          if(typeof sortButtons[data] !== CommonConstants.UNDEFINED) {
            clonedOpts['updateSort'] = this.setTableSort.bind(this, data);
            clonedOpts['sortDirection'] = sortButtons[data];
          }
        }
        sortedCols[index] = React.cloneElement(thh, clonedOpts);
      }
    })
    return sortedCols;
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
      const { tableOpts, perPageRows, defaultPerPage, lang } = this.props.settings;
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
        popup_title
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
              selectedRows={selectedRows} />
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
              defaultPerPage={defaultPerPage}
              perPage={perPage}
              lang={lang}
              selectedRows={selectedRows} />
          </div>
          <Editor
            active={active}
            action={action}
            editor={editor}
            columns={editor.fields}
            editorUpdate={this.editorUpdate.bind(this)}
            selectedRows={selectedRows}
            selectedIds={selectedIds}
            opacity={opacity}
            popupButton={popup_button}
            popupTitle={popup_title}
            hidePopup={this.hidePopup.bind(this)}
            lang={lang} />
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
