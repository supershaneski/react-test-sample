import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import User from './User'

describe('User', () => {

    const server = setupServer(
        
        rest.get('http://user/:userId', (req, res, ctx) => {

            const userId = req.params.userId

            if(userId) {

                return res(ctx.json({
                    pid: 'akc27w4jem35',
                    uid: userId,
                    name: userId === 'xxx0001' ? 'Robert Smith' : 'John Doe',
                    address: userId === 'xxx0001' ? 'Chiyoda, Tokyo' : '',
                    date: Date.now(),
                }))

            } else {

                return res(ctx.status(500))

            }

        }),

        rest.get('http://user', (req, res, ctx) => {

            return res(ctx.status(500))

        })
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    test('receive remote data', async () => {

        render(<User userId="xxx0001" />)

        const errorMessage = await screen.queryByText(/name/i)

        //screen.debug()

        //expect(errorMessage).not.toBeInTheDocument()

        //expect(screen.queryByText(/Oops, something is wrong!/)).not.toBeInTheDocument()
        expect(screen.queryByText(/name/i)).not.toBeInTheDocument()

        screen.debug()

    })

    test('handle error', async () => {

        render(<User userId="" />)

        const errorMessage = await screen.findByText(/Oops, something is wrong!/i)

        screen.debug()

        expect(errorMessage).toBeInTheDocument()

    })


})