jest.mock('@apollo/react-hooks')
import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import LoginPage from '../../pages/login'
import { useMutation } from '@apollo/react-hooks'

const mockFn = jest.fn()
useMutation.mockReturnValue([mockFn, {data: {}, error: {}}])

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/' }
})

describe('Login Page', () => {
  const fillOutLoginForm = async getByTestId => {
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')
    await wait(
      fireEvent.change(usernameField, {
        target: {
          value: 'user name'
        }
      }),
      fireEvent.change(passwordField, {
        target: {
          value: 'password123'
        }
      })
    )
  }
  beforeEach(() => {
    global.window.location.pathname = '/login' // reset path
  })

    test('should not submit when empty form', async () => {
    const { getByTestId } = render(<LoginPage />)
    const submitButton = getByTestId('submit')
    await wait(() => {
      act(() => {
        fireEvent.click(submitButton)
      })
    })
    expect(mockFn).not.toBeCalled()
  })

  test('Should redirect to curriculum', async () => {
    useMutation.mockReturnValue([mockFn, {data: {login: { success: true}}}])
    const { getByTestId } = render(<LoginPage />)
    const submitButton = getByTestId('submit')
    fillOutLoginForm(getByTestId)

    await wait(() => {
        fireEvent.click(submitButton)
    })
    expect(global.window.location.pathname).toEqual('/curriculum')
  })

    test('Should set alert visible on invalid credentials', async () => {
      useMutation.mockReturnValue([mockFn, {
        error: {
          graphQLErrors: [
            {
              message: 'UserInputError: User does not exist!'
            }
          ]
        }
      }
      ])

    const { getByTestId } = render(<LoginPage />)
    const submitButton = getByTestId('submit')
    fillOutLoginForm(getByTestId)

    act(
      () => {
        fireEvent.click(submitButton)
      },
      () => {
        getByText('User does not exist!')
      }
    )
  })
})
