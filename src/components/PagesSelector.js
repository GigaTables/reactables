import React from 'react'
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class PagesSelector extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.perPageRows !== nextProps.perPageRows
      || this.props.perPage !== nextProps.perPage;
  }

  render()
  {
    const {
      lang,
      perPageRows,
      perPage,
      updatePerPage
    } = this.props;
    var language = Lang[lang];
    return (
      <div className={styles.gt_rows_selector}>
        <span>{language.show}&nbsp;</span>
        <span>
          <select onChange={(event) => {updatePerPage(event)}}
          value={perPage} className={styles.gt_select}>
          {
            perPageRows.map((rows, index) => {
                return <option key={index}>{rows}</option>;
            })
          }
          </select>
        </span>
        <span>&nbsp;{language.entries}</span>
      </div>
    )
  }
}

export default PagesSelector
