import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import Greeting from './Greeting'

describe('Greeting2', () => {
    
    const server = setupServer(
        rest.get('http://greeting', (req, res, ctx) => {
            return res(ctx.json({greeting: 'hello there'}))
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())


    test('loads and displays greeting', async () => {
        
        render(<Greeting url="greeting" />)

        fireEvent.click(screen.getByText('Load Greeting'))

        await waitFor(() => screen.getByRole('heading'))
        
        expect(screen.getByRole('heading')).toHaveTextContent('hello there')
        
        expect(screen.getByRole('button')).toBeDisabled()

    })

    test('handles server error', async () => {
        
        server.use(
            rest.get('http://greeting', (req, res, ctx) => {
                return res(ctx.status(500))
            }),
        )
        
        render(<Greeting url="greeting" />)

        fireEvent.click(screen.getByText('Load Greeting'))

        await waitFor(() => screen.getByRole('alert'))
        
        expect(screen.getByRole('alert')).toHaveTextContent('Oops, failed to fetch!')
        
        expect(screen.getByRole('button')).not.toBeDisabled()

    })

})