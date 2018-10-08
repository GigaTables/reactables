import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MTextArea from '../../theme/material-ui/MTextArea'
import TextArea from './TextArea'

import CommonConstants from '../../CommonConstants'

class HOCTextArea extends Component {
    render() {
        const {
            attributes,
            id,
            name,
            value,
            onFocus,
            onChange,
            isMultiple,
            theme
        } = this.props
        
        return (theme === CommonConstants.THEME_MATERIAL_UI) ?
           <MTextArea
               onFocus={onFocus}
               onChange={onChange}
               {...attributes}
               id={id}
               name={name}
               value={value}
               data-multiple={isMultiple}
               data-textarea={true}
           /> :
            <TextArea
                onFocus={onFocus}
                onChange={onChange}
                {...attributes}
                id={id}
                name={name}
                value={value}
                data-multiple={isMultiple}
                data-textarea={true}
            />;
    }
}

HOCTextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.object
}

export default HOCTextArea