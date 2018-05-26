import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Select extends Component {
    render() {
        const {
            attributes,
            id,
            name,
            value,
            onChange,
            objectValues
        } = this.props
        
        let values = objectValues
        let options = [], val = ''
        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim()
                        options[k] = <option key={key} value={key} data-value={val.toLowerCase()}>{val}</option>
                    }
                }
            }
        }
        return (
            <select
                onChange={onChange}
                {...attributes}
                id={id}
                name={name}
                value={value}
            >{options}</select>
        )
    }
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
}

export default Select