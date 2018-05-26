import React from 'react'
import renderer from 'react-test-renderer'
import CheckRadio from '../../../../src/components/form/fields/CheckRadio.js'

it('renders Select correctly', () => {
    const tree = renderer.create(
        <CheckRadio
            key={1}
            onChange={(e) => {}}
            id={'title'}
            type={'select'}
            name={'title'}
            label={'Label'}
            value={"1"}
            objectValues={[ { 'key1': "1" }, { 'key2': 'val2' } ]}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
    let innerObj = Object.create({name: 'inherited'});
    const tree2 = renderer.create(
        <CheckRadio
            key={1}
            onChange={(e) => {}}
            id={'title'}
            type={'select'}
            name={'title'}
            label={'Label'}
            value={1}
            objectValues={[innerObj]}
        />
    ).toJSON()
    expect(tree2).toMatchSnapshot()
    const tree3 = renderer.create(
        <CheckRadio
            key={1}
            onChange={(e) => {}}
            id={'title'}
            type={'select'}
            name={'title'}
            label={'Label'}
            value={1}
            objectValues={innerObj}
        />
    ).toJSON()
    expect(tree3).toMatchSnapshot()
});