import React, { Component } from 'react'

class EditorButton extends Component {
    render() {
        const {
            action,
            btnClicked,
            children,
        } = this.props;

        return (
            <button
                id="gte_sent_btn"
                className="btn"
                data-action={action}
                onClick={btnClicked.bind(this)}>{children}</button>
        )
    }
}

export default EditorButton