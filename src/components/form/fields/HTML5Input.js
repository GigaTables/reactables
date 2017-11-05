import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';

class HTML5Input extends Component {
    render() {
        const {
            attributes,
            id,
            type,
            name,
            label,
            onChange,
        } = this.props;
        return (
            <div className="gte_editor_fields">
                <label
                    className="gte_label"
                    htmlFor={id}>
                    {label}
                </label>
                <div className={editorStyles.gte_field}>
                    <input
                        onChange={onChange}
                        {...attributes}
                        id={id}
                        type={type}
                        name={name}
                    />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

HTML5Input.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.array,
    label: PropTypes.string,
};

export default HTML5Input