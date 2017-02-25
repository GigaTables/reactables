import React from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Search extends React.Component {
  render()
  {
    return (
      <div className={styles.gt_main_search}>
        <input type="text" className={styles.gt_search} placeholder="Search" />
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Search
