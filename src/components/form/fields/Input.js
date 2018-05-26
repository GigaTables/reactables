import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Input extends Component {
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
        } = this.props
        return (
            <input onFocus={onFocus}
                   onChange={onChange}
                   {...attributes}
                   id={id}
                   type={type}
                   name={name}
                   value={value}
                   data-multiple={isMultiple}/>
        )
    }
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
}

export default Input