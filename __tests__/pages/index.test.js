import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import IndexPage from '../../pages/index'
import dummySessionData from '../../__dummy__/sessionData'
import { useRouter } from 'next/router'

describe('Index Page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.window.location.pathname = '/not-root'
  })

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

  test('Should redirect to /curriculum and return null', async () => {
    const { container } = render(
      <MockedProvider
        mocks={mocksWithSession(dummySessionData)}
        addTypename={false}
      >
        <IndexPage />
      </MockedProvider>
    )
    await waitFor(() => {
      expect(global.window.location.pathname).toEqual('/curriculum')
      expect(container.firstChild).toBeNull()
    }) // wait for loading state to pass
  })

  test('Should not redirect without session', async () => {
    const { push } = useRouter()
    render(
      <MockedProvider mocks={mocksWithSession(null)} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )
    await waitFor(() => expect(push).not.toHaveBeenCalled())
  })
})
