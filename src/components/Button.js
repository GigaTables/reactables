import React, { Component, PropTypes } from 'react';
import styles from '../css/styles.css';
import editor from '../css/editor.css';
import classNames from 'classnames/bind';

var CommonConstants = require('./CommonConstants');
var EditorConstants = require('./EditorConstants');

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick (event) {
    const { showPopup } = this.props;
    return showPopup(event);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.active !== nextProps.active
      || this.props.action !== nextProps.action;
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
  active: PropTypes.bool
}

export default Button
