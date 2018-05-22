import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Range from 'rc-slider/es/Range'

class RcRange extends Component {
    render() {
        const {
            value,
            pluginProps
        } = this.props
        const wrapperStyle = {width: 400, margin: 50}
        return (
            <div>
                <div style={wrapperStyle}>
                    <p>Range with custom handle</p>
                    <Range {...pluginProps} defaultValue={value} tipFormatter={value => `${value}%`}/>
                </div>
            </div>
        )
    }
}

RcRange.propTypes = {
    value: PropTypes.array.isRequired
}

export default RcRange