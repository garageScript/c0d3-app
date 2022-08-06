import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import SignupPage from '../../pages/signup'
import userEvent from '@testing-library/user-event'
import { getLayout } from '../../components/Layout'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

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

import dummySessionData from '../../__dummy__/sessionData'

describe('Signup Page', () => {
  const { push, query } = useRouter()

  const fakeEmail = 'fake@email.com'
  const fakeUsername = 'fakeusername'
  const fakeFirstName = 'fakefirstname'
  const fakeLastName = 'fakelastname'
  const fakePassword = 'fakepassword'

  const fillOutSignupForm = async getByTestId => {
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')
    const passwordField = getByTestId('password')

    // the type event needs to be delayed so the Formik validations finish
    await userEvent.type(emailField, fakeEmail, { delay: 1 })
    await userEvent.type(usernameField, fakeUsername, { delay: 1 })
    await userEvent.type(firstNameField, fakeFirstName, { delay: 1 })
    await userEvent.type(lastNameField, fakeLastName, { delay: 1 })
    await userEvent.type(passwordField, fakePassword, { delay: 1 })
  }

  test('Should redirect to /curriculum on success', async () => {
    query.next = null

    signIn.mockReturnValue({
      error: null,
      status: null,
      ok: true
    })

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutSignupForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => expect(push).toBeCalledWith('/curriculum'))
  })

  test('Should use Layout component getLayout ', async () => {
    expect(SignupPage.getLayout === getLayout).toBe(true)
  })

  test('Should render error message on fail', async () => {
    signIn.mockReturnValue({
      error: 'Server side error found',
      status: 401
    })

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutSignupForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          'Server Error: Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
        )
      ).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  test('Should render network error on fail', async () => {
    signIn.mockReturnValue({
      error: 'Server side error found',
      status: null
    })

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await fillOutSignupForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Server side error found')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
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
        <SignupPage />
      </MockedProvider>
    )

    await waitFor(() =>
      expect(getByText('You are already logged in.')).toBeTruthy()
    )
  })
})
