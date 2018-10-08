import React, { Component } from 'react'
import Button from './Button'
import MButton from '../theme/material-ui/MButton'

import CommonConstants from '../CommonConstants'

class HOCButton extends Component {
    render() {
        const {
            action,
            children,
            active,
            selectedRows,
            showPopup,
            theme,
            incr
        } = this.props;
        
        return (theme === CommonConstants.THEME_MATERIAL_UI) ? <MButton
            active={active}
            selectedRows={selectedRows}
            action={action}
            showPopup={showPopup}
            key={incr}
        >{children}</MButton> : <Button
            active={active}
            selectedRows={selectedRows}
            action={action}
            showPopup={showPopup}
            key={incr}
        >{children}</Button>
    }
}

export default HOCButton