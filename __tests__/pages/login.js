import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Login from '../../pages/login'

describe('Login Page', () => {
  const handleSubmit = jest.fn(obj => null)

  test('Should return data', async () => {
    // const loginUser = jest.fn((username, password) => {})
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
      fireEvent.click(submitButton),
        expect(handleSubmit).toHaveBeenCalledTimes(1),
        expect(handleSubmit.mock.calls[0][0]).toEqual({
          username: 'username123',
          password: 'password123'
        })
    })
  })
})
