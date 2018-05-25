import '../../css/rc-slider.css'
import '../../css/rc-tooltip.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Range from 'rc-slider/es/Range'

class RcRange extends Component {
    onChange (value) {
        const {
            isMultiple,
            onChange,
            name
        } = this.props
        onChange({
            target: {
                dataset: {
                    multiple: isMultiple
                },
                value: value,
                name: name
            }
        })
    }
    
    render() {
        const {
            value,
            pluginProps
        } = this.props
        const wrapperStyle = {width: 400, margin: 50}
        return (
            <div>
                <div style={wrapperStyle}>
                    <Range {...pluginProps} defaultValue={value} tipFormatter={value => `${value}%`}
                           onChange={this.onChange.bind(this)}/>
                </div>
            </div>
        )
    }
}

RcRange.propTypes = {
    value: PropTypes.array.isRequired
}

export default RcRange