import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchBar from './SearchBar'

describe('SearchBar', () => {
    test('renders SearchBar component', async () => {
        render(<SearchBar />)

        // implicit assertion
        //screen.debug()

        // explicit assertion
        //expect(screen.getByText('Search')).toBeInTheDocument()
        //expect(screen.getByText('Search:')).toBeInTheDocument()
        //expect(screen.getByText(/Search/)).toBeInTheDocument()

        //screen.getByRole('')
        //expect(screen.getByRole('searchbox')).toBeInTheDocument()

        //expect(screen.getByText(/Searches for Javascript/)).toBeNull()
        //expect(screen.queryByText(/Searches for Javascript/)).toBeNull()
        
        //expect(screen.queryByText(/Signed in as/)).toBeNull()
        //screen.debug()
        //expect(await screen.findByText(/Signed in as/)).toBeInTheDocument()
        //screen.debug()

        await screen.findByText(/Signed in as /)

        expect(screen.queryByText(/Searches for Javascript/)).toBeNull()

        //screen.debug()

        /*fireEvent.change(screen.getByRole('searchbox'), {
            target: { value: 'Javascript', },
        })*/

        await userEvent.type(screen.getByRole('searchbox'), 'Javascript')

        //screen.debug()

        expect(screen.getByText(/Searches for Javascript/)).toBeInTheDocument()

    })
})