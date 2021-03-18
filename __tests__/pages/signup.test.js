import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import SIGNUP_USER from '../../graphql/queries/signupUser'
import SignupPage from '../../pages/signup'
import userEvent from '@testing-library/user-event'

describe('Signup Page', () => {
  const fakeEmail = 'fake@email.com'
  const fakeUsername = 'fakeusername'
  const fakeFirstName = 'fakefirstname'
  const fakeLastName = 'fakelastname'

  const fillOutSignupForm = async getByTestId => {
    const emailField = getByTestId('email')
    const usernameField = getByTestId('username')
    const firstNameField = getByTestId('firstName')
    const lastNameField = getByTestId('lastName')

    // the type event needs to be delayed so the Formik validations finish
    await userEvent.type(emailField, fakeEmail, { delay: 1 })
    await userEvent.type(usernameField, fakeUsername, { delay: 1 })
    await userEvent.type(firstNameField, fakeFirstName, { delay: 1 })
    await userEvent.type(lastNameField, fakeLastName, { delay: 1 })
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

    await fillOutSignupForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => {
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

    await fillOutSignupForm(getByTestId)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(
        getByText(
          'Server cannot be reached. Please try again. If this problem persists, please send an email to support@c0d3.com'
        )
      ).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })
})
