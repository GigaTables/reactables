import React, { Component } from 'react'
import PropTypes from 'prop-types'

class File extends Component {
    constructor(props) {
        super(props)
        this.inputFiles = null
    }
    
    handleFileChange() {
        let file = this.inputFiles
        this.props.setFilesInput(file)
    }
    
    render() {
        const {
            attributes,
            id,
            type,
            name
        } = this.props
        return (
            <input
                ref={(input) => {
                    this.inputFiles = input
                }}
                {...attributes}
                id={id}
                type={type}
                name={name}
                onChange={this.handleFileChange.bind(this)}/>
        )
    }
}

File.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    attributes: PropTypes.object,
    label: PropTypes.string
}

export default File