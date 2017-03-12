import React from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Search extends React.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.searchValue !== nextProps.searchValue;
  }

  render()
  {
    const { lang, doSearch, searchValue } = this.props;
    var language = Lang[lang];
    return (
      <div className={styles.gt_main_search}>
        <input
          tabIndex="1"
          defaultValue={searchValue}
          onKeyUp={doSearch}
          type="text"
          className={styles.gt_search}
          placeholder={language.search} />
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Search
