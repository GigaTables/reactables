import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import MButton from '../theme/material-ui/MButton'

const CommonConstants = require('../CommonConstants')

class HOCButton extends React.Component {
    render() {
        const {
            action,
            children,
            active,
            selectedRows,
            showPopup,
            theme,
            incr
        } = this.props
        
        return (theme === CommonConstants.THEME_MATERIAL_UI) ? <Button
            active={active}
            selectedRows={selectedRows}
            action={action}
            showPopup={showPopup}
            key={incr}
        >{children}</Button> : <MButton
            active={active}
            selectedRows={selectedRows}
            action={action}
            showPopup={showPopup}
            key={incr}
        >{children}</MButton>
    }
}

export default HOCButton