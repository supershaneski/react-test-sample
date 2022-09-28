import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ToggleColor from './ToggleColor'

describe('ToggleColor', () => {

    test('check button behavior', async () => {

        render(
            <ToggleColor bgColor1='chartreuse' bgColor2='magenta' text1='Change to Magenta' text2='Change to Chartreuse' />
        )

        const colorButton = screen.getByRole('button')

        //expect(screen.getByRole('button')).toHaveStyle('color: blue')

        expect(colorButton).toHaveStyle('background-color: chartreuse')
        expect(colorButton.textContent).toBe('Change to Magenta')
        
        fireEvent.click(colorButton)

        expect(colorButton).toHaveStyle('background-color: magenta')
        expect(colorButton.textContent).toBe('Change to Chartreuse')


    })

})