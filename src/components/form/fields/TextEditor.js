import React, {Component} from 'react';
import RichTextEditor from 'react-rte';
import editorStyles from '../../../css/editor.css';

class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue(),
        };
    }

    onChange = (value) => {
        this.setState({value});
        // console.log(value.toString('html'));
        if (this.props.onChangeHtml) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChangeHtml(this,
                value.toString('html')
            );
        }
    };

    render() {
        const {
            id,
            name,
            label,
            onFocus,
            multiple,
        } = this.props;
        return (
            <div className="gte_editor_fields">
                <label className="gte_label"
                       htmlFor={id}>{label}</label>
                <div className={editorStyles.gte_field}>
                    <RichTextEditor
                        data-multiple={multiple}
                        value={this.state.value}
                        onChange={this.onChange}
                        name={name}
                        onFocus={onFocus}
                        data-textarea={true}
                    />
                </div>
                <div className="clear"></div>
            </div>
        );
    }
}

export default TextEditor