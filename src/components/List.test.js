import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import List from './List'
import { act } from 'react-dom/test-utils'

describe('List', () => {

    let originalFetch

    beforeEach(() => {

        originalFetch = global.fetch
        /*global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                items: [
                    { id: 'xyz0001', title: 'Title 001'},
                    { id: 'xyz0002', title: 'Title 002'},
                    { id: 'xyz0003', title: 'Title 003'},
                    { id: 'xyz0004', title: 'Title 004'},
                    { id: 'xyz0005', title: 'Title 005'},
                    { id: 'xyz0006', title: 'Title 006'},
                    { id: 'xyz0007', title: 'Title 007'},
                    { id: 'xyz0008', title: 'Title 008'},
                    { id: 'xyz0009', title: 'Title 009'},
                    { id: 'xyz0010', title: 'Title 010'}
                ]
            })
        }))*/

    })

    afterEach(() => {
        global.fetch = originalFetch
    })

    test('fetches data from API and display them', async () => {
        
        const promise = Promise.resolve({
            items: [
                { id: 'xyz0001', title: 'Title 001'},
                { id: 'xyz0002', title: 'Title 002'},
                { id: 'xyz0003', title: 'Title 003'},
                { id: 'xyz0004', title: 'Title 004'},
                { id: 'xyz0005', title: 'Title 005'},
                { id: 'xyz0006', title: 'Title 006'},
                { id: 'xyz0007', title: 'Title 007'},
                { id: 'xyz0008', title: 'Title 008'},
                { id: 'xyz0009', title: 'Title 009'},
                { id: 'xyz0010', title: 'Title 010'}
            ]
        })

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => promise
        }))
        
        render(<List />)

        await userEvent.click(screen.getByRole('button'))

        await act(() => promise)

        screen.debug()

        expect(screen.getAllByRole('listitem')).toHaveLength(10)

    })

    test('fetches data from API and fails', async () => {
        
        const promise = Promise.resolve()

        global.fetch = jest.fn(() => Promise.resolve({
            json: () => promise
        }))
        
        render(<List />)

        await userEvent.click(screen.getByRole('button'))

        await act(() => promise)

        screen.debug()

        expect(await screen.findByText(/Something went wrong.../)).toBeInTheDocument()

    })

})