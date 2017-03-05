import React from 'react'

export default class Column extends React.Component {
  render()
  {
    console.log(this.props.selectedrows);
    return (
      <td key={this.props.gteRowId} data-rowid={this.props.count} 
      data-selectedrows={this.props.selectedrows}
      data-index={this.props.dataIndex}>{this.props.children}</td>
    )
  }
}
