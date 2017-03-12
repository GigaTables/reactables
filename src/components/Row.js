import React from 'react'
import styles from '../css/styles.css'
import classNames from 'classnames/bind'

export default class Row extends React.Component {
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
