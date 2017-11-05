import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/styles.css';

const Lang = require('../Lang');

class Search extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.search !== nextProps.search;
  }

  render()
  {
    const {
      lang,
      doSearch,
      search,
    } = this.props;

    const language = Lang[lang];
    return (
      <div className={styles.gt_main_search}>
        <input
          tabIndex="1"
          value={search}
          onKeyUp={doSearch}
          onChange={doSearch}
          type="text"
          name="search"
          className={styles.gt_search}
          placeholder={language.search} />
        <div className={styles.clear}></div>
      </div>
    )
  }
}

Search.propTypes = {
  lang: PropTypes.string.isRequired,
  doSearch: PropTypes.func.isRequired,
  search: PropTypes.string,
};

export default Search
