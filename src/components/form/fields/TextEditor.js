import React, { Component } from 'react'
import RichTextEditor from 'react-rte'

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: RichTextEditor.createEmptyValue()
        }
    }
    
    onChange = (value) => {
        this.setState({value})
        if (this.props.onChangeHtml) {
            // Send the changes up to the parent component as an HTML string.
            // This is here to demonstrate using `.toString()` but in a real app it
            // would be better to avoid generating a string on each change.
            this.props.onChangeHtml(this,
                value.toString('html')
            )
        }
    }
    
    render() {
        const {
            name,
            onFocus,
            multiple
        } = this.props
        return (
            <RichTextEditor
                data-multiple={multiple}
                value={this.state.value}
                onChange={this.onChange}
                name={name}
                onFocus={onFocus}
                data-textarea={true}
            />
        )
    }
}

export default TextEditor