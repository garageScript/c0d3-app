import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { noop } from '../../components/Button'

describe('Button Component', () => {
  test('noop func', () => {
    expect(noop()).toEqual(undefined)
  })

  test('Should call onClick prop when clicked', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<Button onClick={onClick} />)
    const leftClick = { button: 0 }

    fireEvent.click(getByRole('button'), leftClick)
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
