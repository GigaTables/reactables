import React, { PropTypes } from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick (event) {
    const { showPopup } = this.props;
    return showPopup(event);
  }

  render()
  {
    const { action, children } = this.props;
    return (
      <div
        className="gte_buttons_container"
        data-action={action}
        onClick={this.onClick}>
        <div data-action={action} className="gte_button">
          <span data-action={action} >{children}</span>
        </div>
        <div className={styles.clear}></div>
      </div>
    )
  }
}

Button.propTypes = {
  action: PropTypes.string,
}

export default Button
