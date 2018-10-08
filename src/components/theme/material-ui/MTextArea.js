import React, { Component } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/es/TextField/TextField'

class MTextArea extends Component {
    
    render() {
        const {
            attributes,
            id,
            name,
            value,
            onFocus,
            onChange,
            isMultiple
        } = this.props
        
        return (
            <TextField
                onFocus={onFocus}
                onChange={onChange}
                {...attributes}
                id={id}
                name={name}
                value={value}
                type="jopa"
                data-multiple={isMultiple}
                data-textarea={true}
                multiline
                fullWidth
                rowsMax="5"
            />
        )
    }
}

MTextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
}

export default MTextArea