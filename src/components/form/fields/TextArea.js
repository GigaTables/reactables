import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TextArea extends Component {
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
            <textarea
                onFocus={onFocus}
                onChange={onChange}
                {...attributes}
                id={id}
                name={name}
                value={value}
                data-multiple={isMultiple}
                data-textarea={true}
            ></textarea>
        )
    }
}

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
}

export default TextArea