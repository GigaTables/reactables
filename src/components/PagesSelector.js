import React from 'react'
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class PagesSelector extends React.Component {
  render()
  {
    return (
      <div className={styles.gt_rows_selector}>
        <span>Show&nbsp;</span>
        <span>
          <select defaultValue={this.props.defaultPerPage} className={styles.gt_select}>
          {
            this.props.perPageRows.map((rows, index) => {
                return <option key={index}>{rows}</option>;
            })
          }
          </select>
        </span>
        <span>&nbsp;entries</span>
      </div>
    )
  }
}

export default PagesSelector
