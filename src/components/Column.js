import React, { PropTypes } from 'react'

class Column extends React.Component {
  shouldComponentUpdate(nextProps) {
    const { gteRowId, count, selectedRows, dataIndex } = this.props;
    return gteRowId !== nextProps.gteRowId
      || count !== nextProps.count
      || selectedRows.length !== nextProps.selectedRows.length
      || dataIndex !== nextProps.dataIndex;
  }

  render()
  {
    const { gteRowId, count, selectedRows, dataIndex } = this.props;
    return (
      <td
        key={gteRowId}
        data-rowid={count}
        data-realid={gteRowId}
        data-selectedrows={selectedRows}
        data-index={dataIndex}>{this.props.children}</td>
    )
  }
}

Column.propTypes = {
  gteRowId: PropTypes.number,
  count: PropTypes.number,
  selectedRows: PropTypes.array,
  dataIndex: PropTypes.string
}

export default Column
