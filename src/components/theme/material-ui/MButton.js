import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import styles from '../../../css/styles.css';
import classNames from 'classnames/bind'
import Button from '@material-ui/core/es/Button/Button'

class MButton extends Component {
    
    onClick(action, event) {
        const {showPopup} = this.props
        return showPopup(event, action)
    }
    
    shouldComponentUpdate(nextProps) {
        return this.props.active !== nextProps.active
            || this.props.action !== nextProps.action
    }
    
    render() {
        const {action, children, active} = this.props
        
        return (
            <div className="gte_buttons_container" data-action={action}
                 onClick={(active === false) ? this.onClick.bind(this, action) : undefined}>
                <Button disabled={active} variant="raised" color="primary">
                    {children}
                </Button>
            </div>
        )
    }
}

MButton.propTypes = {
    action: PropTypes.string,
    active: PropTypes.bool,
    showPopup: PropTypes.func
}

export default MButton
