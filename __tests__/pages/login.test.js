jest.mock('next-auth/react')

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
          errors: [new GraphQLError('User does not exist!')]
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

    await findByText(mocks[1].result.errors[0].message)
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
})
