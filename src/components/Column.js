import React from 'react'

export default class Column extends React.Component {
  render()
  {
    return (
      <td
        key={this.props.gteRowId}
        data-rowid={this.props.count}
        data-realid={this.props.gteRowId}
        data-selectedrows={this.props.selectedRows}
        data-index={this.props.dataIndex}>{this.props.children}</td>
    )
  }
}
