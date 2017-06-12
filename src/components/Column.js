import React, { Component, PropTypes } from 'react';
import styles from '../css/styles.css';
import classNames from 'classnames/bind';

var EditorConstants = require('./EditorConstants');

class Column extends Component {
  shouldComponentUpdate(nextProps) {
    const {
      gteRowId,
      count,
      selectedRows,
      dataIndex,
      editableCells,
    } = this.props;
    return editableCells === true
      || gteRowId !== nextProps.gteRowId
      || count !== nextProps.count
      || selectedRows.length !== nextProps.selectedRows.length
      || dataIndex !== nextProps.dataIndex;
  }

  constructor(props)
  {
    super(props);
    this.state = {
      cellValue: this.props.children,
    };
  }

  changeCell(e)
  {
    this.setState({
      cellValue: e.target.value
    });
  }

  getColumn()
  {
    const {
      gteRowId,
      count,
      selectedRows,
      dataIndex,
      cell, // string uid of this cell - 00, 01, 11, 12
      editableCells, // bool if cells are editable
      editedCell, // uid of edited
      editCell, // function
      editRow, // function
      minRow,
      maxRow,
      children,
    } = this.props;
    const {
      cellValue,
    } = this.state;

    if(editableCells === true && dataIndex === EditorConstants.EDITABLE_CELLS_INDEX) {
      let cellClasses = classNames({
        normal_checkbox: true,
        select_checkbox: (selectedRows.indexOf(count) !== -1) ? true : false
      });
      return (
        <td
          onClick={editRow}
          key={gteRowId}
          data-rowid={count}
          data-realid={gteRowId}
          data-selectedrows={selectedRows}
          data-index={dataIndex}
          data-minrow={minRow}
          data-maxrow={maxRow}
          ><div onClick={editRow} className={cellClasses}></div></td>
      )
    }
    // console.log('d: ' + editedCell + ' c: ' + cell);
    return (
      <td
        key={gteRowId}
        data-rowid={count}
        data-realid={gteRowId}
        data-selectedrows={selectedRows}
        data-index={dataIndex}
        data-cell={cell}
        onClick={editCell}>
          {(editedCell === cell) ?
            <input type={EditorConstants.TYPE_TEXT}
            value={cellValue}
            data-cell={cell}
            onClick={editCell}
            onChange={(e) => {this.changeCell(e)}}/> : children}
      </td>
    )
  }

  render()
  {
    return this.getColumn();
  }
}

Column.propTypes = {
  editableCells: PropTypes.bool,
  gteRowId: PropTypes.number,
  count: PropTypes.number,
  selectedRows: PropTypes.array,
  dataIndex: PropTypes.string,
}

export default Column
