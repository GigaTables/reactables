import React from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Button extends React.Component {
  render()
  {
    return (
      <div className="gte_buttons_container">
        <div className="gte_button" onClick={(event) => {this.props.showPopup(event)}}>
          <span>{this.props.children}</span>
        </div>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Button
