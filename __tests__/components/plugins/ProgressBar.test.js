import React from 'react'
import renderer from 'react-test-renderer'
import ProgressBar from '../../../src/components/plugins/ProgressBar.js'

it('renders ProgressBar correctly', () => {
    const tree = renderer.create(
        <ProgressBar
            classname="progress_bar"
            percent={12}
            height={20}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})