import React, {Component} from 'react'
import Button from '@material-ui/core/es/Button/Button'

const styles = {
    container: {
        paddingRight: 15,
        paddingLeft: 15,
        marginBottom: -5,
    },
    btn: {
        float: "right",
        padding: "5px 15px",
    }
};

class MEditorButton extends Component {
    render() {
        const {
            action,
            btnClicked,
            children
        } = this.props;

        return (
            <div style={styles.container}>
                <Button
                    variant="raised"
                    color="primary"
                    id="gte_sent_btn"
                    data-action={action}
                    style={styles.btn}
                    onClick={btnClicked}>
                    {children}
                </Button>
            </div>
        )
    }
}

export default MEditorButton