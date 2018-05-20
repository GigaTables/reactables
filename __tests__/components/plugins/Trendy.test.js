import React from 'react'
import renderer from 'react-test-renderer'
import Trendy from '../../../src/components/plugins/Trendy'

it('renders Trendy correctly', () => {
    const tree = renderer.create(
        <Trendy
            data={[0, 10, 5, 22, 3.6, 11]}
            pluginProps={{}}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})