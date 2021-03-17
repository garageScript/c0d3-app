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
  })

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
  test('Should not redirect without cookie', async () => {
    const { push } = useRouter()
    render(
      <MockedProvider mocks={mocksWithSession(null)} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )
    await waitFor(() => expect(push).not.toHaveBeenCalled())
  })
  test('Should redirect to /curriculum if cookie exists', async () => {
    document.cookie = 'loggedIn=true'
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
    }) // wait for loading state to pass
  })
})
