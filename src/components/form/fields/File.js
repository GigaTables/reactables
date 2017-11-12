import React, {Component} from 'react';
import PropTypes from 'prop-types';
import editorStyles from '../../../css/editor.css';

class File extends Component {
    constructor(props) {
        super(props);
        this.inputFiles = null;
    }

    handleFileChange() {
        let file = this.inputFiles;
        this.props.setFilesInput(file);
    }

    render() {
        const {
            attributes,
            id,
            type,
            name,
            label,
        } = this.props;
        return (
            <div key={id} className="gte_editor_fields">
                <label className="gte_label" htmlFor={id}>{label}</label>
                <div className={editorStyles.gte_field}>
                    <input
                        ref={(input) => {
                            this.inputFiles = input;
                        }}
                        {...attributes}
                        id={id}
                        type={type}
                        name={name}
                        onChange={this.handleFileChange.bind(this)}/>
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

File.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.array,
    label: PropTypes.string,
};

export default File