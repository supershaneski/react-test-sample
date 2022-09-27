import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Greeting from './Greeting'
import { act } from 'react-dom/test-utils'

describe('Greeting', () => {

    let originalFetch

    beforeEach(() => {

        originalFetch = global.fetch
        
    })

    afterEach(() => {
        global.fetch = originalFetch
    })

    test('fetches data from API and display them', async () => {
        
        const promise = Promise.resolve({
            greeting: 'hello there'
        })

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => promise
        }))
        
        render(<Greeting url="greeting" />)

        await userEvent.click(screen.getByRole('button'))

        await act(() => promise)

        screen.debug()
        
        expect(screen.getByRole('heading')).toHaveTextContent('hello there')

        expect(screen.getByRole('button')).toBeDisabled()

    })

    test('fetches data from API and fails', async () => {
        
        const promise = Promise.resolve()

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => promise
        }))
        
        render(<Greeting url="greetings" />)

        await userEvent.click(screen.getByRole('button'))

        await act(() => promise)

        screen.debug()
        
        expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
        
        expect(screen.getByRole('button')).not.toBeDisabled()

    })

})