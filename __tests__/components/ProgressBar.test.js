import React from 'react'
import renderer from 'react-test-renderer'
import ProgressBar from '../../src/components/table/ProgressBar.js'

it('renders Select correctly', () => {
    const tree = renderer.create(
        <ProgressBar
            classname="progress_bar"
            percent={12}
            height={20}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
});