import * as React from 'react'
import Curriculum from '../../pages/curriculum'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'

export default {
  component: Curriculum,
  title: 'Pages/Curriculum'
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

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum />
    </MockedProvider>
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

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum />
    </MockedProvider>
  )
}

export const CompletedLessons: React.FC = () => {
  const session = {
    ...dummySessionData,
    lessonStatus: [
      {
        lessonId: '5',
        isPassed: true,
        isTeaching: true,
        isEnrolled: false
      },
      {
        lessonId: '2',
        isPassed: true,
        isTeaching: true,
        isEnrolled: false
      },
      {
        lessonId: '1',
        isPassed: true,
        isTeaching: true,
        isEnrolled: false
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

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum />
    </MockedProvider>
  )
}
