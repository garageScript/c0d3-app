import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { GraphQLError } from 'graphql'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import LOGIN_USER from '../../graphql/queries/loginUser'
import LoginPage from '../../pages/login'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/' }
})

describe('Login Page', () => {
  const fakeUsername = 'fake username'
  const fakePassword = 'fake password'

  const fillOutLoginForm = getByTestId => {
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')

    fireEvent.change(usernameField, {
      target: {
        value: fakeUsername
      }
    })

    fireEvent.change(passwordField, {
      target: {
        value: fakePassword
      }
    })
  }

  beforeEach(() => {
    global.window.location.pathname = '/login' // reset path
  })

  test('Should redirect to /curriculum on success', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: null,
            lessons: [],
            alerts: []
          }
        }
      },
      {
        request: {
          query: LOGIN_USER,
          variables: {
            username: fakeUsername,
            password: fakePassword
          }
        },
        result: {
          data: {
            login: {
              success: true,
              username: fakeUsername,
              cliToken: 'fake token',
              error: null
            }
          }
        }
      }
    ]

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutLoginForm(getByTestId)
        fireEvent.click(submitButton)
      })
    })

    await wait(() =>
      expect(global.window.location.pathname).toEqual('/curriculum')
    )
  })

  test('Should set alert visible on invalid credentials', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: null,
            lessons: [],
            alerts: []
          }
        }
      },
      {
        request: {
          query: LOGIN_USER,
          variables: {
            username: fakeUsername,
            password: fakePassword
          }
        },
        result: {
          errors: [new GraphQLError('UserInputError: User does not exist!')]
        }
      }
    ]

    const { container, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutLoginForm(getByTestId)
        fireEvent.click(submitButton)
      })
    })

    await wait(() => {
      expect(global.window.location.pathname).toEqual('/login')
      expect(container).toMatchSnapshot()
    })
  })
})
