import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';

class Select extends Component {
    render() {
        const {
            attributes,
            id,
            name,
            value,
            label,
            onChange,
            objectValues,
        } = this.props;

        let values = objectValues;
        let options = [], val = '';
        for (let k in values) {
            if (values.hasOwnProperty(k)) {
                for (let key in values[k]) {
                    if (values[k].hasOwnProperty(key)) {
                        val = values[k][key].trim();
                        options[k] = <option key={key} value={key} data-value={val.toLowerCase()}>{val}</option>;
                    }
                }
            }
        }
        return (
            <div key={id} className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{label}</label>
                <div className={editorStyles.gte_field}>
                    <select
                        onChange={onChange}
                        {...attributes}
                        id={id}
                        name={name}
                        value={value}
                    >{options}</select>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

Select.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attributes: PropTypes.array,
    label: PropTypes.string,
    value: PropTypes.string,
};

export default Select