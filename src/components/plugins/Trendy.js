import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Trend from 'react-trend'

class Trendy extends Component {
    render () {
        const {
            data,
            pluginProps
        } = this.props
        return (
            <Trend data={data} {...pluginProps}/>
        )
    }
}

Trendy.propTypes = {
    data: PropTypes.array.isRequired
}

export default Trendy