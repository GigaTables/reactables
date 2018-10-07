import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CheckRadio from './CheckRadio'
import MRadio from '../../theme/material-ui/MRadio'
import MCheckBox from '../../theme/material-ui/MCheckBox'

import CommonConstants from '../../CommonConstants'
import EditorConstants from '../../EditorConstants'

class HOCCheckRadio extends Component {
    render() {
        const {
            id,
            attributes,
            type,
            name,
            onChange,
            value, // fieldValue
            objectValues,
            theme,
            label
        } = this.props;
        
        return (theme === CommonConstants.THEME_MATERIAL_UI)
            ? ((type === EditorConstants.TYPE_RADIO) ? <MRadio
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                attributes={attributes}
                value={value}
                objectValues={objectValues}
                label={label}
            /> : <MCheckBox
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                attributes={attributes}
                value={value}
                objectValues={objectValues}
                label={label}
            />)
            : <CheckRadio
                id={id}
                type={type}
                name={name}
                onChange={onChange}
                attributes={attributes}
                value={value}
                objectValues={objectValues}
            />;
    }
}

HOCCheckRadio.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    value: PropTypes.string
}

export default HOCCheckRadio