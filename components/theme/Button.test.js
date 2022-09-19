import React from 'react'
import { Button } from './Button'
import { render } from '@testing-library/react'

describe('Custom button Component', () => {
  test('button should have the className that user passes in', () => {
    const { container } = render(<Button className="newButton" />)
    const newButton = container.querySelector('.btn')
    expect(newButton.classList.contains('newButton')).toBeTruthy()
  })
})
