import React from 'react'
import { render, wait } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../testUtil/withNextRouter'
import Lesson from '../../pages/curriculum/[lesson]'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'

describe('Lesson Page', () => {
  test('Should render correctly with valid lesson route', async () => {
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
          id: '1',
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
          isEnrolled: false
        },
        {
          lessonId: '2',
          isPassed: false,
          isTeaching: false,
          isEnrolled: true
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
            alerts: dummyAlertData
          }
        }
      }
    ]

    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '2' }
      }
    )

    const { container } = render(tree)

    await wait(() => expect(container).toMatchSnapshot())
  })

  test('Should render correctly with invalid lesson route', async () => {
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
          id: '1',
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
          isEnrolled: false
        },
        {
          lessonId: '2',
          isPassed: false,
          isTeaching: false,
          isEnrolled: true
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
            alerts: dummyAlertData
          }
        }
      }
    ]

    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '100' }
      }
    )

    const { container } = render(tree)

    await wait(() => expect(container).toMatchSnapshot())
  })
})
