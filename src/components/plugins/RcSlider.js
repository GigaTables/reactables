import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'rc-tooltip'
import Slider from 'rc-slider'
import Handle from 'rc-slider/es/Handle'

class RcSlider extends Component {
    render () {
        const {
            value,
            pluginProps
        } = this.props
        
        const handle = (props) => {
            const { value, dragging, index, ...restProps } = props
            return (
                <Tooltip
                    prefixCls="rc-slider-tooltip"
                    overlay={value}
                    visible={dragging}
                    placement="top"
                    key={index}
                >
                    <Handle value={value} {...restProps} />
                </Tooltip>
            )
        }
        const wrapperStyle = { width: 400, margin: 50 }
        return (
            <div>
                <div style={wrapperStyle}>
                    <p>Slider with custom handle</p>
                    <Slider {...pluginProps} defaultValue={value} handle={handle}/>
                </div>
            </div>
        )
    }
}

RcSlider.propTypes = {
    value: PropTypes.number.isRequired,
    pluginProps: PropTypes.object
}

export default RcSlider