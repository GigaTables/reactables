import React from 'react'
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class PagesSelector extends React.Component {
  render()
  {
    var lang = Lang[this.props.lang];
    return (
      <div className={styles.gt_rows_selector}>
        <span>{lang.show}&nbsp;</span>
        <span>
          <select onChange={(event) => {this.props.updatePerPage(event)}}
          value={this.props.perPage} className={styles.gt_select}>
          {
            this.props.perPageRows.map((rows, index) => {
                return <option key={index}>{rows}</option>;
            })
          }
          </select>
        </span>
        <span>&nbsp;{lang.entries}</span>
      </div>
    )
  }
}

export default PagesSelector
