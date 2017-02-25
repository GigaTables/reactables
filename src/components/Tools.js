import React from 'react'
import Button from './Button.js'
import PagesSelector from './PagesSelector.js'
import Search from './Search.js'
import styles from '../css/styles.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Tools extends React.Component {
  render()
  {
    return (
      <div className="gt_head_tools">
        {// proccess buttons
          this.props.tableOpts.buttons.map((btn, i) => {
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_CREATE) {
              return <Button key={i}>New</Button>;
            }
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_EDIT) {
              return <Button key={i}>Edit</Button>;
            }
            if (btn[EditorConstants.EXTENDED] === EditorConstants.EDITOR_REMOVE) {
              return <Button key={i}>Delete</Button>;
            }
          })
        }
        <PagesSelector defaultPerPage={this.props.defaultPerPage}
        perPageRows={this.props.perPageRows}/>
        <Search/>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Tools
