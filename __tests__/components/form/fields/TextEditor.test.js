import React from 'react'
import renderer from 'react-test-renderer'
import TextEditor from '../../../../src/components/form/fields/TextEditor.js'
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

it('renders TextArea correctly', () => {
    const tree = renderer.create(
        <TextEditor
            key={1}
            onFocus={(e) => {}}
            onChangeHtml={(e) => {}}
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
});

const obj = shallow(
    <TextEditor
        key={1}
        onFocus={(e) => {}}
        onChangeHtml={(e) => {}}
        id={'desc'}
        type={'textarea'}
        name={'desc'}
        label={'Description'}
        value={'foo bar baz'}
        attributes={{'cols': 50, 'rows': 20}}
        isMultiple={false}
        data-textarea={true}
    />
);

obj.instance().onChange({'foo':'bar'});