import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import ScrollTopArrow from './ScrollTopArrow'

describe('ScrollTopArrow component', () => {
  const window = global.window
  window.scrollTo = jest.fn()
  beforeEach(() => {
    window.scrollY = 0
    window.innerHeight = 200
    jest.clearAllMocks()
  })
  test('Visible only after scrolling 2 screen lengths', async () => {
    render(<ScrollTopArrow />)

    expect(
      screen.queryByRole('button', { name: 'Scroll to top' })
    ).not.toBeInTheDocument()

    fireEvent.scroll(window, {
      target: { scrollY: 401 }
    })

    expect(
      screen.queryByRole('button', { name: 'Scroll to top' })
    ).toBeVisible()
  })
  test('Should scroll to the top when arrow is clicked', async () => {
    render(<ScrollTopArrow />)

    fireEvent.scroll(window, {
      target: { scrollY: 401 }
    })

    await userEvent.click(
      screen.queryByRole('button', { name: 'Scroll to top' })
    )

    expect(window.scrollTo).toBeCalledWith(0, 0)
  })
})
