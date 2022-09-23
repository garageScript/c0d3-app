import * as React from 'react'
import Lesson from '../../pages/curriculum/[lessonSlug]'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
import { SubmissionStatus } from '../../graphql'

export default {
  component: Lesson,
  title: 'Pages/Lesson'
}

export const Basic: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: dummyLessonData,
          session: dummySessionData,
          alerts: []
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Lesson />
    </MockedProvider>,
    {
      query: { lesson: '2' }
    }
  )
}

export const WithAlerts: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: dummyLessonData,
          session: dummySessionData,
          alerts: dummyAlertData
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Lesson />
    </MockedProvider>,
    {
      query: { lesson: '2' }
    }
  )
}

export const CompletedChallenges: React.FC = () => {
  const session = {
    ...dummySessionData,
    submissions: [
      {
        id: '1',
        status: SubmissionStatus.Passed,
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
        status: SubmissionStatus.Passed,
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
    ]
  }

  const mocks = [
    {
      request: { query: GET_APP },
      result: {
        data: {
          lessons: dummyLessonData,
          session,
          alerts: []
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Lesson />
    </MockedProvider>,
    {
      query: { lesson: '2' }
    }
  )
}
