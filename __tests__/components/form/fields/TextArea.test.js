import React from 'react'
import renderer from 'react-test-renderer'
import TextArea from '../../../../src/components/form/fields/TextArea.js'

it('renders TextArea correctly', () => {
    const tree = renderer.create(
        <TextArea
            key={1}
            onFocus={(e) => {}}
            onChange={(e) => {}}
            id={'desc'}
            type={'textarea'}
            name={'desc'}
            label={'Description'}
            value={'foo bar baz'}
            attributes={{'cols': 50, 'rows': 20}}
            isMultiple={false}
            data-textarea={true}
        />
    ).toJSON()
    expect(tree).toMatchSnapshot()
})