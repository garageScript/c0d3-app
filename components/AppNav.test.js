import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../graphql/queries/getApp'
import LOGOUT_USER from '../graphql/queries/logoutUser'
import dummySessionData from '../__dummy__/sessionData'
import AppNav from './AppNav'

// Mock global.window
global.window = Object.create(window)

// define property to be modifed beforeEach test
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/not-root' } // make sure pathname isnt '/' by default
})

describe('AppNav Component', () => {
  beforeEach(() => {
    global.window.location.pathname = '/not-root' // reset path
  })

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
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppNav />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByText('Logout'))
      fireEvent.click(getByText('Logout'))
    })

    await waitFor(() => expect(global.window.location.pathname).toEqual('/'))
  })
})
