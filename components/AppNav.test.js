import React from 'react'
import { render, fireEvent, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../graphql/queries/getApp'
import LOGOUT_USER from '../graphql/queries/logoutUser'
import dummySessionData from '../__dummy__/sessionData'
import AppNav from './AppNav'
import { useRouter } from 'next/router'

describe('AppNav Component', () => {
  const { push } = useRouter()
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
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('Should redirect to / route on logout success', async () => {
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
  test('should redirect to / when clicking on logo', async () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppNav />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByText('C0D3'))
      fireEvent.click(getByText('C0D3'))
    })

    await waitFor(() => expect(push).toHaveBeenCalled())
  })
  test('should not redirect to / when clicking on logo based on localStorage', async () => {
    window.localStorage.setItem('loggedIn', true)
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AppNav />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByText('C0D3'))
      fireEvent.click(getByText('C0D3'))
    })

    await waitFor(() => expect(push).not.toHaveBeenCalled())
  })
})
