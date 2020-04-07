import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import Signup from '../../pages/signup'
import * as signupHelper from '../../helpers/signupUser'

describe('Signup Page', () => {
  const fillOutSignupForm = async getByTestId => {
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')
    await wait(
      fireEvent.change(emailField, {
        target: {
          value: 'email@domain.com'
        }
      }),
      fireEvent.change(usernameField, {
        target: {
          value: 'user name'
        }
      }),
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      }),
      fireEvent.change(firstNameField, {
        target: {
          value: 'user'
        }
      }),
      fireEvent.change(lastNameField, {
        target: {
          value: 'name'
        }
      })
    )
  }

  test('Should render without crashing', () => {
    const { getByTestId } = render(<Signup />)
    getByTestId('email')
    getByTestId('username')
    getByTestId('password')
    getByTestId('firstName')
    getByTestId('lastName')
  })

  test('Should not submit values if form is empty', async () => {
    signupHelper.signupUser = jest.fn()
    const { getByTestId } = render(<Signup />)
    const submitButton = getByTestId('submit')
    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      }),
        expect(signupHelper.signupUser).not.toBeCalled()
    })
  })

  test('Should submit signup form values and render success component', async () => {
    signupHelper.signupUser = jest
      .fn()
      .mockReturnValue(Promise.resolve({ success: true }))
    const { getByTestId } = render(<Signup />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      }),
        expect(signupHelper.signupUser).toHaveBeenCalledTimes(1)
    })
  })

  test('Should submit signup form values and display error component upon failure of email', async () => {
    signupHelper.signupUser = jest.fn().mockReturnValue(
      Promise.resolve({
        success: false,
        errorMessage: {
          confirmEmail: ['This email has been taken']
        }
      })
    )
    const { container, getByTestId } = render(<Signup />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      }),
        expect(signupHelper.signupUser).toHaveBeenCalledTimes(1),
        expect(container).toMatchSnapshot()
    })
  })

  test('Should submit signup form values and display error component upon failure of username', async () => {
    signupHelper.signupUser = jest.fn().mockReturnValue(
      Promise.resolve({
        success: false,
        errorMessage: {
          userName: ['Username not available']
        }
      })
    )
    const { container, getByTestId } = render(<Signup />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      }),
        expect(signupHelper.signupUser).toHaveBeenCalledTimes(1),
        expect(container).toMatchSnapshot()
    })
  })

  test('Should submit signup form values and display error component upon failure of both username and email', async () => {
    signupHelper.signupUser = jest.fn().mockReturnValue(
      Promise.resolve({
        success: false,
        errorMessage: {
          confirmEmail: ['This email has been taken'],
          userName: ['Username not available']
        }
      })
    )
    const { container, getByTestId } = render(<Signup />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      }),
        expect(signupHelper.signupUser).toHaveBeenCalledTimes(1),
        expect(container).toMatchSnapshot()
    })
  })
})
