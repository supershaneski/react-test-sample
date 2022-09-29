import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Users from './Users'

describe('Users', () => {

    const server = setupServer(
        
        rest.get('http://users', (req, res, ctx) => {

            const page = parseInt(req.url.searchParams.get('page'))
            const count = parseInt(req.url.searchParams.get('count'))

            let items = new Array(count).fill(0).map((a, i)=> {
                return {
                    id: i,
                    name: 'user'+i,
                    birthdate: '2022/09/28',
                    section: 'section'
                }
            })
            
            if(page === 0 && count === 0) {

                return res(ctx.status(500))

            } else {

                return res(ctx.json({ items: items , page: page, count: count }))

            }

            
            
        })
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    
    test('receive remote data', async () => {
        
        const count = 4

        render(<Users page={0} count={count} />)

        const loadingMessage = await screen.getByText(/Loading.../i)
        expect(loadingMessage).toBeInTheDocument()

        const totalMessage = await screen.findByText(`Total: ${count}`)

        screen.debug()

        expect(screen.getAllByRole('listitem')).toHaveLength(count)
        expect(totalMessage).toBeInTheDocument()
        
    })

    test('handle error', async () => {

        render(<Users page={0} count={0} />)

        const errorMessage = await screen.findByText(/Oops, something went wrong!/i)

        screen.debug()

        expect(errorMessage).toBeInTheDocument()

    })


})