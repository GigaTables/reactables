import React, {Component} from 'react'
import PropTypes from 'prop-types'
import MSelect from '../../theme/material-ui/MSelect'
import Select from './Select'

const CommonConstants = require('../../CommonConstants');

class HOCSelect extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            value,
            label,
            onChange,
            objectValues,
            theme,
            incr
        } = this.props;
        
        return (theme === CommonConstants.THEME_MATERIAL_UI)
            ? <MSelect
                onChange={onChange.bind(this)}
                id={id}
                name={name}
                value={value}
                attributes={attributes}
                objectValues={objectValues}
            />
            : <Select
                key={incr}
                onChange={onChange.bind(this)}
                id={id}
                type={type}
                name={name}
                label={label}
                value={value}
                attributes={attributes}
                objectValues={objectValues}
            />
    }
}

HOCSelect.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
};

export default HOCSelect