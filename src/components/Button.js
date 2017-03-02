import React from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Button extends React.Component {
  render()
  {
    return (
      <div className="gte_buttons_container" data-action={this.props.action}
        onClick={(event) => {this.props.showPopup(event)}}>
        <div data-action={this.props.action} className="gte_button">
          <span data-action={this.props.action}>{this.props.children}</span>
        </div>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

export default Button
