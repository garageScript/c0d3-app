import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../graphql/queries/getApp'
import LOGOUT_USER from '../graphql/queries/logoutUser'
import LOGIN_USER from '../graphql/queries/loginUser'
import dummySessionData from '../__dummy__/sessionData'
import AppNav from './AppNav'

describe('AppNav Component', () => {
  test('Should redirect to / route on logout success', async () => {
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
        request: {
          query: LOGOUT_USER
        },
        result: {
          data: {
            logout: {
              success: true,
              username: 'fake user',
              error: null
            }
          }
        }
      }
    ]

    const { getByText, getAllByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppNav />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByText('A'))
      fireEvent.click(getByText('A'))
      await waitFor(() => getAllByText('Logout'))
      fireEvent.click(getAllByText('Logout')[0])
    })

    await waitFor(() => expect(global.window.location.pathname).toEqual('/'))
  })

  test('Should show admin menu if the user is an admin', async () => {
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
        request: {
          query: LOGIN_USER
        },
        result: {
          data: {
            login: {
              success: true,
              username: 'fake user',
              error: null
            }
          }
        }
      }
    ]

    const { getByText, getAllByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppNav />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByText('A'))
      fireEvent.click(getByText('A'))
      await waitFor(() => getAllByText('Lessons'))
    })

    expect(getAllByText('Lessons')[0]).toBeTruthy()
  })
})
