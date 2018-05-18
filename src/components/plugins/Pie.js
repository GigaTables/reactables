import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PieChart from 'react-minimal-pie-chart'

class Pie extends Component {
    render () {
        const {
            data,
            pluginProps
        } = this.props
        return (
            <PieChart data={data} {...pluginProps}/>
        )
    }
}

Pie.propTypes = {
    data: PropTypes.array.isRequired
}

export default Pie