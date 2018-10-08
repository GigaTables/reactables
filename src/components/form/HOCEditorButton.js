import React, { Component } from 'react'
import EditorButton from "./EditorButton";
import MEditorButton from "../theme/material-ui/MEditorButton";

import CommonConstants from '../CommonConstants'

class HOCEditorButton extends Component {
    render() {
        const {
            action,
            btnClicked,
            theme,
            children
        } = this.props;

        return (theme === CommonConstants.THEME_MATERIAL_UI) ? <MEditorButton
            action={action}
            btnClicked={btnClicked}
        >{children}</MEditorButton> : <EditorButton
            action={action}
            btnClicked={btnClicked}
        >{children}</EditorButton>
    }
}

export default HOCEditorButton