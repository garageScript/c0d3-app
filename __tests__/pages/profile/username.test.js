import React from 'react'
import { render, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import { GraphQLError } from 'graphql'
import GET_APP from '../../../graphql/queries/getApp'
import USER_INFO from '../../../graphql/queries/userInfo'
import UserProfile from '../../../pages/profile/[username]'
import { MockedProvider } from '@apollo/client/testing'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import { useRouter } from 'next/router'
import { withTestRouter } from '../../../testUtil/withNextRouter'
jest.mock('next/router')

useRouter.mockImplementation(() => ({
  query: {
    username: 'fake user'
  },
  push: jest.fn()
}))
describe('user profile test', () => {
  test('Should render loading spinner if data is not ready', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: dummyLessonData,
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: dummySessionData
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'fake user'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await findByRole('heading', { name: /loading/i })
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    expect(container).toMatchSnapshot()
  })
  test('Should render profile', async () => {
    const session = {
      ...dummySessionData,
      submissions: [
        {
          id: '1',
          status: 'passed',
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: '146',
          lessonId: '2',
          reviewer: {
            id: '1',
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123'
        },
        {
          id: '2',
          status: 'passed',
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: '145',
          lessonId: '2',
          reviewer: {
            id: '1',
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123'
        }
      ],
      lessonStatus: [
        {
          lessonId: '5',
          isPassed: true,
          isTeaching: true,
          isEnrolled: false,
          starGiven: null,
          starsReceived: null
        },
        {
          lessonId: '2',
          isPassed: true,
          isTeaching: true,
          isEnrolled: false,
          starGiven: null,
          starsReceived: null
        },
        {
          lessonId: '1',
          isPassed: true,
          isTeaching: true,
          isEnrolled: false,
          starGiven: null,
          starsReceived: null
        }
      ]
    }
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: session
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'fake user'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })

  test('Should return error on error', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        error: new Error('error')
      }
    ]

    const { findByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )

    const element = await findByRole('heading', { name: /Back/i })
    expect(element).toBeTruthy()
  })
  test('Should render anonymous users', async () => {
    const anonymous = {
      ...dummySessionData,
      user: {
        id: 1,
        username: 'fakeusername',
        name: '',
        isAdmin: 'true'
      }
    }
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: dummyLessonData,
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: anonymous
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'fake user'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })
  test('Should render nulled lessons', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: [null, null, null],
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: dummySessionData
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'newbie'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })
  test('Should render nulles challenges', async () => {
    const lessons = [
      ...dummyLessonData,
      {
        id: '2',
        title: null,
        description: 'A super simple introduction to help you get started!',
        docUrl:
          'https://www.notion.so/garagescript/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672',
        githubUrl: '',
        videoUrl:
          'https://www.youtube.com/watch?v=H-eqRQo8KoI&list=PLKmS5c0UNZmewGBWlz0l9GZwh3bV8Rlc7&index=1',
        order: null,
        challenges: [null, null, null],
        chatUrl: 'https://chat.c0d3.com/c0d3/channels/js1-variablesfunction'
      }
    ]

    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: lessons,
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: dummySessionData
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'fake user'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })
  test('Should render nulled submission lessonIds', async () => {
    const session = {
      ...dummySessionData,
      submissions: [
        {
          id: 1,
          status: 'passed',
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: '146',
          lessonId: null,
          reviewer: {
            id: '1',
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123'
        }
      ]
    }
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: dummySessionData,
            lessons: dummyLessonData,
            alerts: []
          }
        }
      },
      {
        request: {
          query: USER_INFO,
          variables: {
            username: 'fake user'
          }
        },
        result: {
          data: {
            userInfo: session
          }
        }
      }
    ]
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>,
      {
        query: {
          username: 'newbie'
        }
      }
    )
    const { container, findByRole, queryByText } = render(tree)
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })
})
