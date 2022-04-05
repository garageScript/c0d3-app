import '../../__mocks__/next-auth/nextAuthAPI.mock'
import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import IndexPage from '../../pages/index'
import dummySessionData from '../../__dummy__/sessionData'
import GET_APP from '../../graphql/queries/getApp'
import { useRouter } from 'next/router'

describe('Index Page', () => {
  const { push } = useRouter()

  const mocksWithSession = session => [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session,
          lessons: [],
          alerts: []
        }
      }
    }
  ]
  test('Should render index page', async () => {
    const { container } = render(
      <MockedProvider mocks={mocksWithSession(null)} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should not redirect to /curriculum on first load', async () => {
    const { push } = useRouter()
    render(
      <MockedProvider mocks={mocksWithSession(null)} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )
    await waitFor(() => expect(push).not.toHaveBeenCalled())
  })

  test('Should redirect to /curriculum if localstorage loggedIn exists', async () => {
    process['browser'] = true
    window.localStorage.setItem('loggedIn', 'true')
    render(
      <MockedProvider
        mocks={mocksWithSession(dummySessionData)}
        addTypename={false}
      >
        <IndexPage />
      </MockedProvider>
    )
    await waitFor(() => {
      expect(push).toBeCalledWith('/curriculum')
    })
  })
})
