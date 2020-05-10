jest.mock('@apollo/react-hooks')
import { useMutation } from '@apollo/react-hooks'
import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import SignUpPage, { Signup } from '../../pages/signup'

const mockFn = jest.fn()
useMutation.mockReturnValue([mockFn])

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

  test('should not submit when empty form', async () => {
    const { getByTestId } = render(<SignUpPage />)
    const submitButton = getByTestId('submit')
    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      })
    })
    expect(mockFn).not.toBeCalled()
  })

  test('Should call handleSubmit function when form is filled out', async () => {
    const { getByTestId } = render(<SignUpPage />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      })
    })
  })

  test('Should submit signup form values and render success component', () => {
    mockFn.mockImplementation(() => {
      return {
        data: {
          signup: {
            success: true
          }
        }
      }
    })
    const { getByTestId } = render(<SignUpPage />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    act(() => {
      fireEvent.click(submitButton)
    }, () => {
      getByTestId('signup-success')
    })
  })

  test('Should submit signup form values but render error if there is an error', () => {
    mockFn.mockImplementation(() => {
      return {
        data: {
          signup: {}
        }
      }
    })
    const { getByTestId } = render(<SignUpPage />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    act(() => {
      fireEvent.click(submitButton)
    },() => {
      getByText('Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com')
    })
  })

  test('Should submit signup form values and display error component upon failure of email', () => {
    mockFn.mockImplementation(() => {
      const error = new Error()
      error.graphQLErrors = [
            {
              message: 'UserInputError: User does not exist!'  
            }
          ]
      return Promise.reject(error)
    })
    const { getByTestId } = render(<SignUpPage />)
    const submitButton = getByTestId('submit')
    fillOutSignupForm(getByTestId)

    act(() => {
      fireEvent.click(submitButton)
    },() => {
      getByText('User does not exist!')
    })
  })

})
