import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Button from './Button'

describe('Button', () => {

    test('calls the onChange callback handler', async () => {
        
        const onClick = jest.fn()

        render(
            <Button onClick={onClick}>
                Click Me
            </Button>
        )

        await fireEvent.click(screen.getByRole('button'))
        
        expect(onClick).toHaveBeenCalledTimes(1)

    })

    test('check if the button has correct color', () => {

        const onClick = jest.fn()

        render(
            <Button onClick={onClick} textColor="white" bgColor="red">
                Click Me
            </Button>
        )

        //expect(screen.getByRole('button')).toHaveStyle('color: blue')

        expect(screen.getByRole('button').style.color).toEqual('white')
        expect(screen.getByRole('button').style.backgroundColor).toEqual('red')

        //expect(screen.getByRole('button')).toHaveAttribute('style', 'color: white')

    })

})