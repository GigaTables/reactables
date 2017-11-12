import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';
const EditorConstants = require('../../EditorConstants');

class Input extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            value,
            isMultiple,
            label,
            onFocus,
            onChange,
        } = this.props;
        return (
            <div key={id} className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{(type !== EditorConstants.TYPE_HIDDEN) ? label : null}</label>
                <div className={editorStyles.gte_field}>
                    <input onFocus={onFocus}
                           onChange={onChange}
                           {...attributes}
                           id={id}
                           type={type}
                           name={name}
                           value={value}
                           data-multiple={isMultiple}/>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.array,
    label: PropTypes.string,
};

export default Input