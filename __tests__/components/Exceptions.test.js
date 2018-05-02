import React from 'react'
import { DataException, EditorException } from '../../src/components/Exceptions.js'

it('run exceptions correctly', () => {
    expect(() => {
        throw new DataException()
    }).toThrow()
    expect(() => {
        throw new EditorException()
    }).toThrow()
})