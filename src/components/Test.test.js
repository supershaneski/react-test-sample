import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Search from './Search'

function sum(x, y) {
    return x + y
}

function multiply(x, y) {
    return x * y
}

describe('Greeting2', () => {

    test('loads and displays greeting', async () => {

        const onChange = jest.fn()
        
        render(<Search value="" onChange={onChange}>Search Text:</Search>)

        screen.debug()

        await userEvent.type(screen.getByRole('searchbox'), 'banana')
        
        screen.debug()

        expect(onChange).toHaveBeenCalledTimes(6)

        expect(await screen.findByText(/Search Text:/)).toBeInTheDocument()

    })

    test('get the sum of two values', () => {

        expect(sum(2, 5)).toBe(7)

    })

    test('get the product of two values', () => {

        expect(multiply(5, 0)).toBe(0)

    })

})
