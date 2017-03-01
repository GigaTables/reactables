import React from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Search extends React.Component {
  render()
  {
    var lang = Lang[this.props.lang];
    return (
      <div className={styles.gt_main_search}>
        <input type="text" className={styles.gt_search} placeholder={lang.search} />
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Search
