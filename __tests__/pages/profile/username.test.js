import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  screen,
  waitFor
} from '@testing-library/react'
import '@testing-library/jest-dom'
import GET_APP from '../../../graphql/queries/getApp'
import USER_INFO from '../../../graphql/queries/userInfo'
import UserProfile from '../../../pages/profile/[username]'
import { MockedProvider } from '@apollo/client/testing'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import { useRouter } from 'next/router'
import expectLoading from '../../utils/expectLoading'
import { SubmissionStatus } from '../../../graphql'

describe('user profile test', () => {
  const { query } = useRouter()
  query['username'] = 'fake user'
  test('Should render loading spinner if data is not ready', () => {
    expectLoading(<UserProfile />)
  })
  test('Should render profile', async () => {
    const session = {
      ...dummySessionData,
      submissions: [
        {
          id: 1,
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 146,
          lessonId: 2,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null,
          user: {
            id: 1
          }
        },
        {
          id: 2,
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 145,
          lessonId: 2,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null,
          user: {
            id: 1
          }
        }
      ],
      lessonStatus: [
        {
          lessonId: 5,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 5,
              student: {
                username: 'newbie',
                name: 'newbie newbie'
              },
              lesson: {
                title: 'Foundations of JavaScript',
                order: 1
              },
              comment: 'Thanks for your halp!'
            }
          ]
        },
        {
          lessonId: 2,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 2,
              student: {
                username: 'newbie',
                name: 'newbie newbie'
              },
              lesson: {
                title: 'Variables & Functions',
                order: 1
              },
              comment: 'Thanks for your halp!'
            }
          ]
        },
        {
          lessonId: 1,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 2,
              student: {
                username: 'anonymous',
                name: ''
              },
              lesson: {
                title: 'Variables & Functions',
                order: 1
              },
              comment: ''
            }
          ]
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })

  test('should render discord avatar and username if user connected to discord', async () => {
    const session = {
      user: {
        id: 1,
        username: 'fakeusername',
        name: 'fake user',
        email: 'fake@fakemail.com',
        isAdmin: true,
        discordUserId: 'fakeDiscordId',
        discordUsername: 'fakeDiscordUser',
        discordAvatarUrl: 'https://placeimg.com/640/480/any'
      },
      submissions: [
        {
          id: 1,
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 146,
          lessonId: 2,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null,
          user: {
            id: 1
          }
        },
        {
          id: 2,
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 145,
          lessonId: 2,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null,
          user: {
            id: 1
          }
        }
      ],
      lessonStatus: [
        {
          lessonId: 5,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 5,
              student: {
                username: 'newbie',
                name: 'newbie newbie'
              },
              lesson: {
                title: 'Foundations of JavaScript',
                order: 1
              },
              comment: 'Thanks for your halp!'
            }
          ]
        },
        {
          lessonId: 2,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 2,
              student: {
                username: 'newbie',
                name: 'newbie newbie'
              },
              lesson: {
                title: 'Variables & Functions',
                order: 1
              },
              comment: 'Thanks for your halp!'
            }
          ]
        },
        {
          lessonId: 1,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: [
            {
              id: 17,
              mentorId: 1,
              studentId: 6,
              lessonId: 2,
              student: {
                username: 'anonymous',
                name: ''
              },
              lesson: {
                title: 'Variables & Functions',
                order: 1
              },
              comment: ''
            }
          ]
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /fakeDiscordUser/i })
    expect(container).toMatchSnapshot()
  })

  test('Should render if no stars received', async () => {
    const session = {
      ...dummySessionData,
      submissions: [
        {
          id: 1,
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 146,
          lessonId: 2,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null,
          user: {
            id: 1
          }
        }
      ],
      lessonStatus: [
        {
          lessonId: 5,
          passedAt: new Date(),
          starGiven: null,
          starsReceived: null
        },
        {
          lessonId: 2,
          passedAt: new Date(),
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await findByRole('heading', { name: /@fake user/i })
    expect(container).toMatchSnapshot()
  })
  test('Should render anonymous users', async () => {
    const anonymous = {
      ...dummySessionData,
      user: {
        id: 1,
        username: 'fake user',
        name: '',
        isAdmin: true,
        discordUserId: '',
        discordUsername: '',
        discordAvatarUrl: ''
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
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
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    await waitFor(() => screen.findByRole('heading', { name: /@fake user/i }))
    expect(screen.getAllByText('NaN%')[0]).toBeVisible()
  })
  test('Should render nulled challenges', async () => {
    const lessons = [
      ...dummyLessonData,
      {
        id: 2,
        title: null,
        description: 'A super simple introduction to help you get started!',
        docUrl:
          'https://www.notion.so/garagescript/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672',
        githubUrl: '',
        videoUrl:
          'https://www.youtube.com/watch?v=H-eqRQo8KoI&list=PLKmS5c0UNZmewGBWlz0l9GZwh3bV8Rlc7&index=1',
        order: null,
        slug: null,
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
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
          status: SubmissionStatus.Passed,
          mrUrl: '',
          diff: '',
          viewCount: 0,
          comment: '',
          order: 0,
          challengeId: 146,
          lessonId: null,
          reviewer: {
            id: 1,
            username: 'fake reviewer'
          },
          createdAt: '123',
          updatedAt: '123',
          comments: null
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
    const { container, findByRole, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    )
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
})
