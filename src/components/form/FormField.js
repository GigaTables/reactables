import React, { Component } from 'react'
import PropTypes from 'prop-types'
import editorStyles from '../../css/editor.css'
import EditorConstants from '../EditorConstants'

class FormField extends Component {
    render() {
        const {
            id,
            label,
            children,
            type
        } = this.props
        
        return (
            <div key={id} className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{(type !== EditorConstants.TYPE_HIDDEN) ? label : null}</label>
                <div className={editorStyles.gte_field}>
                    {children}
                </div>
                <div className="clear"></div>
            </div>)
    }
}

FormField.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string
}

export default FormField