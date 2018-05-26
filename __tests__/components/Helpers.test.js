import React from 'react'
import { t } from '../../src/components/Helpers'

describe('to translate string correctly', () => {
    test('has changed to Foo baz baz', () => {
        expect(t('Foo {{bar}} baz', { 'bar': 'baz' })).toBe('Foo baz baz')
        let innerObj = Object.create({name: 'inherited'});
        t('Foo {{bar}} baz', innerObj)
    })
})