import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MInput from '../../theme/material-ui/MInput'

import CommonConstants from '../../CommonConstants'
import EditorConstants from '../../EditorConstants'

class HOCInput extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            value,
            isMultiple,
            onFocus,
            onChange,
            theme
        } = this.props
        
        return (theme === CommonConstants.THEME_MATERIAL_UI && type !== EditorConstants.TYPE_HIDDEN)
            ? <MInput
                onFocus={onFocus}
                onChange={onChange}
                {...attributes}
                id={id}
                type={type}
                name={name}
                value={value}
                data-multiple={isMultiple}
            /> : <input onFocus={onFocus}
                        onChange={onChange}
                        {...attributes}
                        id={id}
                        type={type}
                        name={name}
                        value={value}
                        data-multiple={isMultiple}/>
    }
}

HOCInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
}

export default HOCInput