import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import ProfileDropdownMenu from './ProfileDropdownMenu'
import GET_APP from '../graphql/queries/getApp'
import LOGIN_USER from '../graphql/queries/loginUser'
import dummySessionData from '../__dummy__/sessionData'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

describe('Profile Dropdown component', () => {
  test('Should highlight the current active page in the menu on the right path', async () => {
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
              username: 'fakeusername',
              error: null
            }
          }
        }
      }
    ]

    useRouter.mockImplementation(() => ({
      push: jest.fn(),
      pathname: '/profile/fakeusername',
      route: '/profile/fakeusername',
      asPath: '/profile/fakeusername',
      query: ''
    }))

    const { getByTestId, getAllByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProfileDropdownMenu username="fakeusername" isAdmin={true} />
      </MockedProvider>
    )

    await act(async () => {
      await waitFor(() => getByTestId('user-info-image'))
      fireEvent.click(getByTestId('user-info-image'))
      await waitFor(() => getAllByText('Profile')[0])
      fireEvent.click(getAllByText('Profile')[0])
    })

    await waitFor(() =>
      expect(getAllByText('Profile')[0].classList.contains('active')).toBe(true)
    )
  })
})
