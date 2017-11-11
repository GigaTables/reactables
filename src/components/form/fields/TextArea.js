import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';

class TextArea extends Component {
    render() {
        const {
            attributes,
            id,
            name,
            label,
            value,
            onFocus,
            onChange,
            isMultiple,
        } = this.props;
        return (
            <div className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{label}</label>
                <div className={editorStyles.gte_field}>
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
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

TextArea.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.array,
    label: PropTypes.string,
};

export default TextArea