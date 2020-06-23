import React from 'react'
import { GraphQLError } from 'graphql'
import { render, fireEvent, wait, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import RESET_PASSWORD from '../../graphql/queries/resetPassword'
import dummySessionData from '../../__dummy__/sessionData'
import ForgotPassword from '../../pages/forgotpassword'

describe('ForgotPassword Page', () => {
  test('Should render password reset instructions on success', async () => {
    const validUser = 'fakevaliduser'

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
        request: {
          query: RESET_PASSWORD,
          variables: { userOrEmail: validUser }
        },
        result: {
          data: {
            reqPwReset: {
              success: true,
              token: 'faketoken'
            }
          }
        }
      }
    ]

    const { container, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ForgotPassword />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')
    const userOrEmail = getByTestId('userOrEmail')

    // wait for formik validations that are async
    await act(async () => {
      fireEvent.change(userOrEmail, {
        target: {
          value: validUser
        }
      })

      await wait(() => fireEvent.click(submitButton))
    })

    // wait for mutation updates after submitButton is clicked
    await wait(() => expect(container).toMatchSnapshot())
  })

  test('Should render invalid user/email form on error', async () => {
    const invalidUser = 'fakeinvaliduser'

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
        request: {
          query: RESET_PASSWORD,
          variables: { userOrEmail: invalidUser }
        },
        result: {
          errors: [new GraphQLError('invalid user')]
        }
      }
    ]

    const { container, getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ForgotPassword />
      </MockedProvider>
    )

    const submitButton = getByTestId('submit')
    const userOrEmail = getByTestId('userOrEmail')

    // wait for formik validations that are async
    await act(async () => {
      fireEvent.change(userOrEmail, {
        target: {
          value: invalidUser
        }
      })

      await wait(() => fireEvent.click(submitButton))
    })

    // wait for mutation updates after submitButton is clicked
    await wait(() => expect(container).toMatchSnapshot())
  })
})
