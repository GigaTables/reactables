import React from 'react'
import renderer from 'react-test-renderer'
import Pie from '../../../src/components/plugins/Pie.js'

it('renders PieChart correctly', () => {
    const tree = renderer.create(
        <Pie
            data={[
                { value: 10, color: '#E38627' },
                { value: 20, color: '#C13C37' },
                { value: 30, color: '#6A2135' }
            ]}
            pluginProps={{
                ratio: 1,
                lineWidth: 17
            }}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})