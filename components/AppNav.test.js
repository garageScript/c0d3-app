jest.mock('@apollo/react-hooks')
jest.mock('next/router')
import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import AppNav from './AppNav'
import { useMutation } from '@apollo/react-hooks'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/curriculum' } // make sure pathname isnt '/' by default
})

const mockFn = jest.fn()

describe('AppNav Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Should match snapshot with default params', () => {
    const { container } = render(<AppNav />)
    expect(container).toMatchSnapshot()
  })

  test('Should match snapshot when loggedIn', () => {
    useMutation.mockReturnValue([mockFn, { data: {} }])
    const { container } = render(<AppNav loggedIn />)
    expect(container).toMatchSnapshot()
  })

  test('Should call logoutUser when logout Button clicked', () => {
    useMutation.mockReturnValue([mockFn, { data: {} }])
    const { getByText } = render(<AppNav loggedIn />)
    const leftClick = { button: 0 }

    fireEvent.click(getByText('Logout'), leftClick)
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  test('Should redirect to / route when logout success', async () => {
    useMutation.mockReturnValue([
      mockFn,
      { data: { logout: { success: true } } }
    ])
    const { getByText } = render(
      <AppNav firstName="test" lastName="backend" loggedIn />
    )
    const leftClick = { button: 0 }
    fireEvent.click(getByText('Logout'), leftClick)
    await wait(() => expect(global.window.location.pathname).toEqual('/'))
  })
})
