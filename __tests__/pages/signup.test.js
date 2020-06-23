import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import SIGNUP_USER from '../../graphql/queries/signupUser'
import SignupPage from '../../pages/signup'

describe('Signup Page', () => {
  const fakeEmail = 'fake@email.com'
  const fakeUsername = 'fakeusername'
  const fakeFirstName = 'fakefirstname'
  const fakeLastName = 'fakelastname'

  const fillOutSignupForm = getByTestId => {
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')

    fireEvent.change(emailField, {
      target: {
        value: fakeEmail
      }
    })

    fireEvent.change(usernameField, {
      target: {
        value: fakeUsername
      }
    })

    fireEvent.change(firstNameField, {
      target: {
        value: fakeFirstName
      }
    })

    fireEvent.change(lastNameField, {
      target: {
        value: fakeLastName
      }
    })
  }

  test('Should render success component on success', async () => {
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
          query: SIGNUP_USER,
          variables: {
            firstName: fakeFirstName,
            lastName: fakeLastName,
            email: fakeEmail,
            username: fakeUsername
          }
        },
        result: {
          data: {
            signup: {
              success: true,
              username: fakeUsername,
              error: null
            }
          }
        }
      }
    ]

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutSignupForm(getByTestId)
        fireEvent.click(submitButton)
      })
    })

    await wait(() => {
      expect(getByText('Account created successfully!')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  test('Should render errors on fail', async () => {
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
          query: SIGNUP_USER,
          variables: {
            firstName: fakeFirstName,
            lastName: fakeLastName,
            email: fakeEmail,
            username: fakeUsername
          }
        },
        result: {
          data: {
            signup: {
              success: false,
              username: null,
              error: null
            }
          }
        }
      }
    ]

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignupPage />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutSignupForm(getByTestId)
        fireEvent.click(submitButton)
      })
    })

    await wait(() => {
      expect(
        getByText(
          'Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
        )
      ).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })
})
