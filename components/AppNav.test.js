import '../__mocks__/next-auth/nextAuthAPI.mock'
import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../graphql/queries/getApp'
import LOGOUT_USER from '../graphql/queries/logoutUser'
import dummySessionData from '../__dummy__/sessionData'
import AppNav from './AppNav'
import { SessionProviderWrapper } from '../helpers/sessionProvider'

describe('AppNav Component', () => {
  test('Should redirect to / route on logout success', async () => {
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

    const { getByText } = render(
      <SessionProviderWrapper>
        <MockedProvider mocks={mocks} addTypename={false}>
          <AppNav />
        </MockedProvider>
      </SessionProviderWrapper>
    )

    await act(async () => {
      await waitFor(() => getByText('Logout'))
      fireEvent.click(getByText('Logout'))
    })

    await waitFor(() => expect(global.window.location.pathname).toEqual('/'))
  })
})
