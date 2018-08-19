import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HTML5Input extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            onChange,
            value
        } = this.props;

        return (
            <input
                onChange={onChange}
                {...attributes}
                id={id}
                type={type}
                name={name}
                value={value}
            />
        )
    }
}

HTML5Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object
};

export default HTML5Input