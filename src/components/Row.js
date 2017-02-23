import React from 'react'

export default class Row extends React.Component {
  render()
  {
    return (
      <tr>{this.props.children}</tr>
    )
  }
}
