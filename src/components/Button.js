import React, { PropTypes } from 'react'
import styles from '../css/styles.css'
import editor from '../css/editor.css'
import classNames from 'classnames/bind';

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
    let buttonClasses = classNames({
      gte_button: true,
      gte_btn_disabled: this.props.active
    });
    return (
      <div
        className="gte_buttons_container"
        data-action={action}
        onClick={(this.props.active === false) ? this.onClick : false}>
        <div data-action={action} className={buttonClasses}>
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
