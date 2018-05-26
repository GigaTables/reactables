import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CheckRadio extends Component {
    render() {
        const {
            attributes,
            type,
            name,
            onChange,
            value, // fieldValue
            objectValues
        } = this.props
        
        let values = objectValues
        let options = [], val = '',
            //@fixme regexp to remove ex: [3] etc
            id = name.replace('[]', '')
        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim()
                        options[k] = <label key={key} className="gte_label_text">
                            <input defaultChecked={(val === value) ? 1 : 0}
                                   onClick={onChange}
                                   {...attributes}
                                   id={id}
                                   type={type}
                                   name={name}
                                   data-value={val.toLowerCase()}
                                   value={key}/>{val}</label>
                    }
                }
            }
        }
        return (
            options
        )
    }
}

CheckRadio.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
}

export default CheckRadio