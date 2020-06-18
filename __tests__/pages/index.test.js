jest.mock('next/router')
import React from 'react'
import { render, wait } from '@testing-library/react'
import { useRouter } from 'next/router'
import { MockedProvider } from '@apollo/react-testing'
import { GET_APP } from '../../graphql/queries'
import IndexPage from '../../pages/index'

describe('Index Page', () => {
  test('Should redirect to curriculum if session is identified', async () => {
    const routerPush = jest.fn()
    useRouter.mockReturnValue({ push: routerPush })

    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: [],
            session: {
              user: {
                id: 1,
                username: 'fakeusername',
                name: 'fake user'
              },
              submissions: [],
              lessonStatus: []
            },
            alerts: []
          }
        }
      }
    ]

    const tree = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )

    render(tree)
    await wait(() => expect(routerPush).toBeCalledWith('/curriculum')) // wait for component state to change
  })

  test('Should render landing page if user is not logged in', async () => {
    const routerPush = jest.fn()
    useRouter.mockReturnValue({ push: routerPush })

    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: [],
            session: {
              user: null,
              submissions: [],
              lessonStatus: []
            },
            alerts: []
          }
        }
      }
    ]

    const tree = (
      <MockedProvider mocks={mocks} addTypename={false}>
        <IndexPage />
      </MockedProvider>
    )

    render(tree)
    await wait(() => expect(routerPush).not.toHaveBeenCalled()) // wait for component state to change
  })
})
