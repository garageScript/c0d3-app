import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { GraphQLError } from 'graphql'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import LOGIN_USER from '../../graphql/queries/loginUser'
import LoginPage from '../../pages/login'
import { useRouter } from 'next/router'
import { getLayout } from '../../components/Layout'
import { cloneDeep } from 'lodash'
import { signIn } from 'next-auth/react'
import dummySessionData from '../../__dummy__/sessionData'

signIn.mockResolvedValue({
  status: null,
  error: null,
  ok: true
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
  const { push, query } = useRouter()
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should use Layout component getLayout ', async () => {
    expect(LoginPage.getLayout === getLayout).toBe(true)
  })

  const successfulLoginMocks = [
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

  test('Should redirect to /curriculum on success', async () => {
    query.next = null

    const { getByTestId } = render(
      <MockedProvider
        mocks={cloneDeep(successfulLoginMocks)}
        addTypename={false}
      >
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutLoginForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => expect(push).toBeCalledWith('/curriculum'))
  })

  test('Should render errors on fail', async () => {
    signIn.mockReturnValueOnce({
      error: { message: 'error' },
      status: 401
    })

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
      }
    ]

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutLoginForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          'Server Error: Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
        )
      ).toBeTruthy()
    })
  })

  test('Should redirect to the path in `next` on success', async () => {
    query.next = 'url-to-go-to-post-login'

    const { getByTestId } = render(
      <MockedProvider
        mocks={cloneDeep(successfulLoginMocks)}
        addTypename={false}
      >
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutLoginForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => expect(push).toBeCalledWith(query.next))
  })

  test('Should set alert visible on invalid credentials', async () => {
    const errMsg = 'User does not exist!'

    signIn.mockResolvedValueOnce({
      status: null,
      error: errMsg,
      ok: false
    })

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
      }
    ]

    const { container, getByTestId, findByTestId, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    const submitButton = await findByTestId('submit')

    await fillOutLoginForm(getByTestId)
    await userEvent.click(submitButton)

    await findByText(errMsg)
    expect(container).toMatchSnapshot()
    expect(push).not.toBeCalled()
  })

  test('Should call signIn function when Discord is clicked', async () => {
    expect.assertions(1)

    const { container } = render(
      <MockedProvider
        mocks={cloneDeep(successfulLoginMocks)}
        addTypename={false}
      >
        <LoginPage />
      </MockedProvider>
    )

    const discordButton = container.querySelector('.discord__button')

    await userEvent.click(discordButton)

    await waitFor(() => expect(signIn).toBeCalled())
  })

  test('Should show AlreadyLoggedIn component if there is a session', async () => {
    expect.assertions(1)

    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: [],
            alerts: []
          }
        }
      },
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: [],
            alerts: []
          }
        }
      }
    ]

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    )

    await waitFor(() =>
      expect(getByText('You are already logged in.')).toBeTruthy()
    )
  })
})
