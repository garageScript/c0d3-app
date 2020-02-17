import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import Signup from '../../pages/signup'

describe('Signup Page', () => {
  const submitSignup = jest.fn()
  const props = { submitSignup }

  test('Should render without crashing', () => {
    const { getByTestId } = render(<Signup {...props} />)
    getByTestId('email')
    getByTestId('username')
    getByTestId('password')
    getByTestId('firstName')
    getByTestId('lastName')
  })

  test('Should not submit values', async () => {
    const { getByTestId } = render(<Signup {...props} />)
    const submitButton = getByTestId('submit')
    fireEvent.click(submitButton)
    await wait(() => expect(submitSignup).not.toBeCalled())
  })

  test('Should submit values', async () => {
    const { getByTestId } = render(<Signup {...props} />)
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')
    const submitButton = getByTestId('submit')

    await wait(() =>
      fireEvent.change(emailField, {
        target: {
          value: 'email@domain.com'
        }
      })
    )

    await wait(() =>
      fireEvent.change(usernameField, {
        target: {
          value: 'user name'
        }
      })
    )

    await wait(() =>
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      })
    )

    await wait(() =>
      fireEvent.change(firstNameField, {
        target: {
          value: 'user'
        }
      })
    )

    await wait(() =>
      fireEvent.change(lastNameField, {
        target: {
          value: 'name'
        }
      })
    )

    fireEvent.click(submitButton)

    await wait(() => expect(submitSignup).toHaveBeenCalledTimes(1))
    await wait(() =>
      expect(submitSignup.mock.calls[0][0]).toEqual({
        email: 'email@domain.com',
        username: 'user name',
        password: 'password123',
        firstName: 'user',
        lastName: 'name'
      })
    )
  })
})
