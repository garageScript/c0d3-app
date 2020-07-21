import React from 'react'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import UPDATE_PASSWORD from '../../graphql/queries/updatePassword'
import { withTestRouter } from '../../testUtil/withNextRouter'
import ResetPassword from '../../pages/confirm/[token]'

const mockFn = jest.fn()

describe('ResetPassword Page', () => {
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
    const fakeToken = 'fake token'
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

    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPassword />
      </MockedProvider>,
      {
        push: jest.fn(),
        query: { token: fakeToken }
      }
    )

    const { container, getByTestId, getByText } = render(tree)

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutResetForm(getByTestId, fakeResetPassword)
        fireEvent.click(submitButton)
      })
    })

    await wait(() => {
      expect(getByText('Password has been set!')).toBeTruthy()
      expect(getByText('Continue to dashboard')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })

  test('Should render alert on error', async () => {
    const fakeToken = 'fake token'
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

    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ResetPassword />
      </MockedProvider>,
      {
        push: jest.fn(),
        query: { token: fakeToken }
      }
    )

    const { container, getByTestId, getByText } = render(tree)

    const submitButton = getByTestId('submit')

    await act(async () => {
      await wait(() => {
        fillOutResetForm(getByTestId, fakeResetPassword)
        fireEvent.click(submitButton)
      })
    })

    await wait(() => {
      expect(getByText('Link has expired.')).toBeTruthy()
      expect(getByText('Request a new password reset')).toBeTruthy()
      expect(container).toMatchSnapshot()
    })
  })
})
