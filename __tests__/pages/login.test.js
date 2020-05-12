import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import * as loginHelper from '../../helpers/loginUser'
import Login from '../../pages/login'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/' }
})

describe('Login Page', () => {
  beforeEach(() => {
    global.window.location.pathname = '/login' // reset path
  })

  test('Should redirect to curriculum', async () => {
    loginHelper.loginUser = jest
      .fn()
      .mockReturnValue(Promise.resolve({ username: 'hello' }))

    const { getByTestId } = render(<Login />)
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    const submitButton = getByTestId('submit')

    await wait(
      () =>
        fireEvent.change(usernameField, {
          target: {
            value: 'username123'
          }
        }),
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      })
    )

    await wait(() => {
      fireEvent.click(submitButton)
    })
    expect(global.window.location.pathname).toEqual('/curriculum')
    expect(loginHelper.loginUser).toHaveBeenCalledWith(
      'username123',
      'password123'
    )
  })

  test('Should set alert visible on invalid credentials', async () => {
    loginHelper.loginUser = jest.fn().mockReturnValue(null)

    const { getByTestId, getByText } = render(<Login />)
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    const submitButton = getByTestId('submit')

    await wait(() => {
      fireEvent.change(usernameField, {
        target: {
          value: 'username123'
        }
      })
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      })
    })

    await wait(() => {
      fireEvent.click(submitButton)
    })
    expect(global.window.location.pathname).toEqual('/login')
    getByText('Incorrect username or password: please try again')
  })
})
