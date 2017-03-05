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
    // console.log(this.props.selectedRows[this.props.gteRowId]);
    return (
      <tr key={this.props.gteRowId} className={rowClasses}
        data-selectedrows={this.props.selectedRows} onClick={this.props.clickedRow}
        data-minrow={this.props.minRow} data-maxrow={this.props.maxRow}
        data-rowid={this.props.count}>{this.props.children}</tr>
    )
  }
}
