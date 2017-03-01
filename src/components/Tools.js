import React from 'react'
import Button from './Button.js'
import PagesSelector from './PagesSelector.js'
import Search from './Search.js'
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');
var Lang = require('./Lang');

class Tools extends React.Component {
  render()
  {
    var lang = Lang[this.props.lang];
    return (
      <div className="gt_head_tools">
        {// proccess buttons
          this.props.tableOpts.buttons.map((btn, i) => {
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_CREATE) {
              return <Button key={i}>{lang.editor_create}</Button>;
            }
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_EDIT) {
              return <Button key={i}>{lang.editor_edit}</Button>;
            }
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_REMOVE) {
              return <Button key={i}>{lang.editor_remove}</Button>;
            }
          })
        }
        <PagesSelector perPage={this.props.perPage} updatePerPage={this.props.updatePerPage}
          defaultPerPage={this.props.defaultPerPage}
          perPageRows={this.props.perPageRows} lang={this.props.lang} />
        <Search lang={this.props.lang}/>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Tools
