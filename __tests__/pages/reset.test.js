import '../../__mocks__/next-auth/nextAuthAPI.mock'
import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import UPDATE_PASSWORD from '../../graphql/queries/updatePassword'
import ResetPassword from '../../pages/confirm/[token]'
import { useRouter } from 'next/router'

describe('ResetPassword Page', () => {
  const { query } = useRouter()
  const fakeToken = 'fake token'
  query['token'] = fakeToken
  const fillOutResetForm = (getByTestId, password) => {
    const passwordField = getByTestId('password')
    const confirmPasswordField = getByTestId('confirmPassword')

    fireEvent.change(passwordField, {
      target: {
        value: password
      }
    })

    fireEvent.change(confirmPasswordField, {
      target: {
        value: password
      }
    })
  }

  test('Should render confirm success on success', async () => {
    const fakeResetPassword = 'fake reset password'

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
          query: UPDATE_PASSWORD,
          variables: {
            token: fakeToken,
            password: fakeResetPassword
          }
        },
        result: {
          data: {
            changePw: {
              success: true
            }
          }
        }
      }
    ]

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPassword />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    fillOutResetForm(getByTestId, fakeResetPassword)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Password has been set!')).toBeTruthy()
      expect(getByText('Continue to dashboard')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  test('Should render alert on error', async () => {
    const fakeResetPassword = 'fake reset password'

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
          query: UPDATE_PASSWORD,
          variables: {
            token: fakeToken,
            password: fakeResetPassword
          }
        },
        error: new Error('invalid token')
      }
    ]

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPassword />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    fillOutResetForm(getByTestId, fakeResetPassword)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Link has expired.')).toBeTruthy()
      expect(getByText('Request a new password reset')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })
})
