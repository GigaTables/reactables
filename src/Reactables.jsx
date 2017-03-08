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
      ctrlDown: false,
      shiftDown: false,
      minRow: 0,
      maxRow: 0,
      opacity: 0
    }
    this.build();
    // console.log(this.state.sortButtons);
  }

  getButtonsState(index, value)
  {
    let buttons = [];
    for (let key in this.state.sortButtons) {
      buttons[key] = this.state.sortButtons[key];
      if (parseInt(key) === parseInt(index)) {
        buttons[key] = value;
      }
    }
    return buttons;
  }

  setTableSort(index, e)
  {
    if (typeof e === CommonConstants.UNDEFINED) { // on start-up - setting default
      let sortedButtons = [];
      this.props.children.map((th, index) => {
        if(typeof this.props.settings.columns[index][CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
        || this.props.settings.columns[index][CommonConstants.SORTABLE] === true) {
          sortedButtons[index] = 0;
        }
      });
      this.setState({
        sortButtons : sortedButtons
      });
    } else { // clicked
      this.props.children.map((th, idx) => {
      var that = this;
      let cols = that.props.settings.columns,
      sJson = that.jsonData,
      sButtons = that.state.sortButtons,
      check = 0, isNan = 0, sortedButtons = [];
      // check and sort for other columns
      if (typeof that.state.sortButtons[idx] !== CommonConstants.UNDEFINED
          && that.state.sortButtons[idx] !== 0
          && idx !== index) {
            if (that.state.sortButtons[idx] === 1) {
              sJson.sort(function (a, b) {
                var an = eval('a.' + cols[idx].data), bn = eval('b.' + cols[idx].data);
                a = (an === null) ? '' : an + '';
                b = (bn === null) ? '' : bn + '';
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
            } else {
              sJson.sort(function (a, b) {
                var an = eval('a.' + cols[idx].data), bn = eval('b.' + cols[idx].data);
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
            }
      }

      if (that.state.sortButtons[index] === 1) {
        sortedButtons = that.getButtonsState(index, -1);
        sJson.sort(function (a, b) {
          var an = eval('a.' + cols[index].data), bn = eval('b.' + cols[index].data);
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
      } else { // if 0 || -1 = 1
        sortedButtons = that.getButtonsState(index, 1);
        sJson.sort(function (a, b) {
          var an = eval('a.' + cols[index].data), bn = eval('b.' + cols[index].data);
          a = (an === null) ? '' : an + '';
          b = (bn === null) ? '' : bn + '';
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
      }
      that.createTable(sJson, sortedButtons);
      });
    }
  }

  build()
  {
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
    let rows = [];
    if (this.state.dataSearch !== null) {
      jsonData = this.state.dataSearch;
    }
    let jsonDataPerPage = jsonData;
    if (jsonData.length > this.state.perPage) {
      let from = parseInt(this.state.fromRow),
      to = from + parseInt(this.state.perPage);
      jsonDataPerPage = jsonData.slice(from, to);
    }
    // process rows
    jsonDataPerPage.map((object, objectIndex) => {
        let cols = [];
        let rowId = 0;
        // perform id check
        if(typeof object[CommonConstants.GT_ROW_ID] !== CommonConstants.UNDEFINED) {
            rowId = object[CommonConstants.GT_ROW_ID];
        } else if (typeof object['id'] !== CommonConstants.UNDEFINED) {
            rowId = object['id'];
        } else {
            throw new DataException('You have neither "GT_RowId" nor "id" in json structure.');
        }
        // process cols
        this.props.settings.columns.map((column, index) => {
          // check if a JSON object has this data field
          if(typeof object[column['data']] !== CommonConstants.UNDEFINED)
          {
            cols.push(<Column dataIndex={column['data']}
            selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
            minRow={this.state.minRow} maxRow={this.state.maxRow}
            count={objectIndex} key={index}>{object[column['data']]}</Column>);
          }
        });
        // count is used to shft key + click selection of rows, ex.: sorted
        rows.push(<Row clickedRow={this.clickedRow.bind(this)}
        selectedRows={(typeof selectedRows !== CommonConstants.UNDEFINED) ? selectedRows : this.state.selectedRows}
        minRow={this.state.minRow} maxRow={this.state.maxRow}
        key={objectIndex} count={objectIndex}
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

  clickedRow(e)
  {
    let rows = this.state.selectedRows;
    let min = 0, max = 0,
    rowId = parseInt(e.target.dataset.rowid);

    if (rows.length > 0 && rows.indexOf(rowId) !== -1
      && this.state.ctrlDown === false) { // if row is active - remove it
      rows = rows.splice(rowId, 1);
      this.state.selectedRows = rows;
    } else {
      if (this.state.ctrlDown === true) {
        rows.push(parseInt(e.target.dataset.rowid));
      } else if (this.state.shiftDown === true) {
        rows.push(parseInt(e.target.dataset.rowid));
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
        rows = [parseInt(e.target.dataset.rowid)];
      }
    }
    // we can't use the state for selectedRows here because of state latency
    this.createTable(this.jsonData, this.state.sortedButtons, rows);
    this.setState({
      selectedRows: rows
    });
  }

  handlePagination(e)
  {
    this.setState({
      fromRow: e.target.dataset.from,
      page: e.target.dataset.from / this.state.perPage + 1
    }, () => {this.createTable(this.jsonData, this.state.sortedButtons)});
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
    }, () => {
        if(!this.timeout)
            clearTimeout(this.timeout);
    		this.timeout = setTimeout(() => this.setState({opacity:0}),4000);
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
    let sortedCols = [];
    this.props.children.map((th, index) => {
      var thh = React.Children.only(th);
      var clonedOpts = {
        key: index,
        sortId: index+'',
        sortDirection: (typeof this.state.sortButtons[index] !== CommonConstants.UNDEFINED) ? this.state.sortButtons[index] : 0
      };
      if(typeof this.props.settings.columns[index][CommonConstants.SORTABLE] === CommonConstants.UNDEFINED
      || this.props.settings.columns[index][CommonConstants.SORTABLE] === true) {
        // set gteSort for <Header> which should be sorted
        clonedOpts['gteSort'] = CommonConstants.SORTABLE;
        if(typeof this.state.sortButtons[index] !== CommonConstants.UNDEFINED) {
          clonedOpts['updateSort'] = this.setTableSort.bind(this, index);
          clonedOpts['sortDirection'] = this.state.sortButtons[index];
        }
      }
      sortedCols[index] = React.cloneElement(thh, clonedOpts);
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
        case CommonConstants.CNTRL_KEY:
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
      return (
        <div className={styles.gt_container} style={{width: "1128px"}}>
          <div className={styles.gt_head_tools}>
            <Tools
              updatePerPage={this.updatePerPage.bind(this)}
              showPopup={this.showPopup.bind(this)}
              tableOpts={this.props.settings.tableOpts}
              perPageRows={this.props.settings.perPageRows}
              perPage={this.state.perPage}
              defaultPerPage={this.props.settings.defaultPerPage}
              lang={this.props.settings.lang}
              selectedRows={this.state.selectedRows} />
          </div>
          <table id="gigatable" className={styles.gigatable}>
            <thead className={styles.gt_head}>
              <tr className={styles.gt_head_tr}>
                {sortedCols}
              </tr>
            </thead>
            <tbody className={styles.gt_body}>
                {this.state.dataRows}
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
              countRows={this.state.countRows}
              page={this.state.page}
              perPage={this.state.perPage}
              fromRow={this.state.fromRow}
              lang={this.props.settings.lang} />
          </div>
          <div className={styles.gt_foot_tools}>
            <Tools
              updatePerPage={this.updatePerPage.bind(this)}
              showPopup={this.showPopup.bind(this)}
              tableOpts={this.props.settings.tableOpts}
              perPageRows={this.props.settings.perPageRows}
              defaultPerPage={this.props.settings.defaultPerPage}
              perPage={this.state.perPage}
              lang={this.props.settings.lang}
              selectedRows={this.state.selectedRows} />
          </div>
          <Editor
            active={this.state.active}
            action={this.state.action}
            editor={this.props.editor}
            selectedRows={this.state.selectedRows}
            opacity={this.state.opacity}
            popupButton={this.state.popup_button}
            popupTitle={this.state.popup_title}
            hidePopup={this.hidePopup.bind(this)}
            lang={this.props.settings.lang} />
        </div>
      )
  }
}

Reactables.propTypes = {
  editor: React.PropTypes.object,
  settings: React.PropTypes.object.isRequired
}

export default Reactables
