import React, { Component } from 'react'
import PropTypes from 'prop-types';
import PieChart from 'react-minimal-pie-chart'

class Pie extends Component {
    render () {
        const {
            data,
        } = this.props
        return (
            <PieChart
                data={data}
            />
        )
    }
}

Pie.propTypes = {
    data: PropTypes.array.isRequired
}

Pie.defaultProps = {

}

export default Pie