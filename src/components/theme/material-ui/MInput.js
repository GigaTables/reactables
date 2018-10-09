import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'
import TextField from '@material-ui/core/TextField'

const classes = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
        float: right,
        marginTop: -5,
    },
    dense: {
        marginTop: -5,
    },
});

class MInput extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            value,
            isMultiple,
            onFocus,
            onChange
        } = this.props;
        
        return (
            <TextField
                variant="standard"
                className={classNames(classes.textField, classes.dense)}
                margin="dense"
                onFocus={onFocus}
                onChange={onChange}
                {...attributes}
                id={id}
                type={type}
                name={name}
                value={value}
                data-multiple={isMultiple}
                fullWidth
            />
        )
    }
}

MInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
};

export default MInput