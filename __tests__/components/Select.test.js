import React from 'react'
import renderer from 'react-test-renderer'
import Select from '../../src/components/form/fields/Select.js'

it('renders Select correctly', () => {
    const tree = renderer.create(
        <Select
            key={1}
            onChange={(e) => {}}
            id={'title'}
            type={'select'}
            name={'title'}
            label={'Label'}
            value={1}
            objectValues={[ { 'key1': 'val1' }, { 'key2': 'val2' } ]}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
});