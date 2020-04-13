import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import * as loginHelper from '../../helpers/loginUser'
import Login from '../../pages/login'
import Router from 'next/router'

describe('Login Page', () => {
  test('Should redirect to curriculum', async () => {
    loginHelper.loginUser = jest
      .fn()
      .mockReturnValue(Promise.resolve({ username: 'hello' }))
    Router.push = jest.fn()

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
    expect(Router.push).toHaveBeenCalledWith('/curriculum')
    expect(loginHelper.loginUser).toHaveBeenCalledWith(
      'username123',
      'password123'
    )
  })

  test('Should set alert visible on invalid credentials', async () => {
    loginHelper.loginUser = jest.fn().mockReturnValue(null)
    Router.push = jest.fn()

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
    getByText('Incorrect username or password: please try again')
    expect(Router.push).toHaveBeenCalledTimes(0)
  })
})
