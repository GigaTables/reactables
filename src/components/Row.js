import React from 'react'
import styles from '../css/styles.css'
import classNames from 'classnames/bind'

export default class Row extends React.Component {
  render()
  {
    let rowClasses = classNames({
      even:(this.props.count % 2 === 0)?true:false,
      odd:(this.props.count % 2 === 0)?false:true,
      active: this.props.selectedRows[this.props.gteRowId]
    });
    return (
      <tr className={rowClasses} onClick={this.props.clickedRow}
       data-rowid={this.props.gteRowId}>{this.props.children}</tr>
    )
  }
}
