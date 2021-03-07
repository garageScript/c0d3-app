import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GraphQLError } from 'graphql'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import LOGIN_USER from '../../graphql/queries/loginUser'
import LoginPage from '../../pages/login'
import { useRouter } from 'next/router'
jest.mock('next/router')
useRouter.mockReturnValue({ asPath: '/' })

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/' }
})

describe('Login Page', () => {
  const fakeUsername = 'fake username'
  const fakePassword = 'fake password'

  const fillOutLoginForm = async getByTestId => {
    const usernameField = getByTestId('username')
    const passwordField = getByTestId('password')

    // the type event needs to be delayed so the Formik validations finish
    await userEvent.type(usernameField, fakeUsername, { delay: 1 })
    await userEvent.type(passwordField, fakePassword, { delay: 1 })
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

    await fillOutLoginForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() =>
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

    const { container, getByTestId, findByTestId, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = await findByTestId('submit')

    await fillOutLoginForm(getByTestId)
    userEvent.click(submitButton)

    await findByText(mocks[1].result.errors[0].message.split(':')[1].trim())

    await waitFor(() => {
      expect(global.window.location.pathname).toEqual('/login')
      expect(container).toMatchSnapshot()
    })
  })
})
