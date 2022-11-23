import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import ResetPassword from '../../pages/confirm/[token]'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

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

  test('Should render confirm success on success', async () => {
    signIn.mockReturnValue({
      ok: true,
      error: '',
      status: 200
    })

    const fakeResetPassword = 'fake reset password'

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

  test('Should display server error on 401 status code', async () => {
    signIn.mockReturnValue({
      ok: false,
      error: '',
      status: 401
    })

    const fakeResetPassword = 'fake reset password'

    const { container, getByTestId, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPassword />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')

    fillOutResetForm(getByTestId, fakeResetPassword)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(getByText('Internal server error')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  test('Should render alert on error', async () => {
    signIn.mockReturnValue({
      ok: false,
      error: 'Invalid token'
    })

    const fakeResetPassword = 'fake reset password'

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
