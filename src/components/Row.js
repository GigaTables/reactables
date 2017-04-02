import React, { PropTypes } from 'react'
import styles from '../css/styles.css'
import classNames from 'classnames/bind'

class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { gteRowId, count, selectedRows, minRow, maxRow } = this.props;
    return gteRowId !== nextProps.gteRowId
      || count !== nextProps.count
      || selectedRows.length !== nextProps.selectedRows.length
      || selectedRows.indexOf(count) !== nextProps.selectedRows.indexOf(count) // on multiple merged rows selection Shift+Clk
      || selectedRows.indexOf(count) !== -1 // on multiple splited rows selection Ctrl+Clk
      || minRow !== nextProps.minRow
      || maxRow !== nextProps.maxRow;
  }

  render()
  {
    const {
      count,
      selectedRows,
      children,
      gteRowId,
      minRow,
      maxRow,
      clickedRow
    } = this.props;

    let rowClasses = classNames({
      even:(count % 2 === 0)?true:false,
      odd:(count % 2 === 0)?false:true,
      active: (selectedRows.indexOf(count) !== -1) ? true : false
    });
    return (
      <tr
        key={gteRowId}
        className={rowClasses}
        data-selectedrows={selectedRows}
        onClick={clickedRow}
        data-minrow={minRow}
        data-maxrow={maxRow}
        data-rowid={count}
        data-realid={gteRowId}>{children}</tr>
    )
  }
}

Row.propTypes = {
  gteRowId: PropTypes.number,
  count: PropTypes.number,
  minRow: PropTypes.number,
  maxRow: PropTypes.number,
  selectedRows: PropTypes.array
}

export default Row
