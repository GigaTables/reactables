import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/styles.css';

const Lang = require('../Lang');

class PagesSelector extends Component {
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
    let language = Lang[lang];
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

PagesSelector.propTypes = {
  lang: PropTypes.string,
  perPage: PropTypes.number,
  perPageRows: PropTypes.array,
  updatePerPage: PropTypes.func
};

export default PagesSelector
