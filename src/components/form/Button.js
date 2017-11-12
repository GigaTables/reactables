import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../css/styles.css';
import classNames from 'classnames/bind';

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
    const { action, children, active } = this.props;
    let buttonClasses = classNames({
      gte_button: true,
      gte_btn_disabled: active
    });
    return (
      <div
        className="gte_buttons_container"
        data-action={action}
        onClick={(active === false) ? this.onClick : undefined}>
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
  active: PropTypes.bool,
  showPopup: PropTypes.func,
};

export default Button
