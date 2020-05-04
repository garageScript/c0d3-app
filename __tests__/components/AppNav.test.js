jest.mock('../../helpers/logoutUser')
jest.mock('next/router')
import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import AppNav from '../../components/AppNav'
import logoutUser from '../../helpers/logoutUser'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/curriculum' } // make sure pathname isnt '/' by default
})

describe('AppNav Component', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  test('Should match snapshot with default params', () => {
    const { container } = render(<AppNav />)
    expect(container).toMatchSnapshot()
  })

  test('Should match snapshot when loggedIn', () => {
    const { container } = render(<AppNav loggedIn />)
    expect(container).toMatchSnapshot()
  })

  test('Should call logoutUser when logout Button clicked', () => {
    const { getByText } = render(<AppNav loggedIn />)
    const leftClick = { button: 0 }

    expect(logoutUser).not.toHaveBeenCalled()
    fireEvent.click(getByText('Logout'), leftClick)
    expect(logoutUser).toHaveBeenCalledTimes(1)
  })

  test('Should redirect to / route when logout success', async () => {
    const { getByText } = render(<AppNav loggedIn />)
    const leftClick = { button: 0 }

    logoutUser.mockReturnValue(Promise.resolve(true))
    fireEvent.click(getByText('Logout'), leftClick)
    await wait(() => expect(global.window.location.pathname).toEqual('/'))
  })
})
