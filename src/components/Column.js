import React from 'react'

export default class Column extends React.Component {
  render()
  {
    return (
      <td data-index={this.props.dataIndex}>{this.props.children}</td>
    )
  }
}
