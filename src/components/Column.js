import React from 'react'
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
      <td className={rowClasses}>{this.props.data}</td>
    )
  }
}
