import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';
import CustomToolbarEditor from "./CustomToolBarEditor";

class Draft extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            attributes,
            id,
            name,
            label,
            value,
            onFocus,
            // onChange,
        } = this.props;

        return (
            <div className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{label}</label>
                <div className={editorStyles.gte_field}>
                    <CustomToolbarEditor
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        {...attributes}
                        id={id}
                        name={name}
                        value={value}
                        data-multiple="0"
                    />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

Draft.propTypes = {
    onChange: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isMultiple: PropTypes.bool,
    onFocus: PropTypes.func,
    attributes: PropTypes.array,
    label: PropTypes.string,
};

export default Draft
