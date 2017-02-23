import React from 'react'
import styles from '../css/styles.css'
import classNames from 'classnames/bind'

export default class Column extends React.Component {
  render()
  {
    let rowClasses = classNames({
      'gt_container': true,
      'gt_body': true,
      'gt_page': false
    });
    return (
      <td data-id={this.props.dataId} className={rowClasses}>{this.props.children}</td>
    )
  }
}
