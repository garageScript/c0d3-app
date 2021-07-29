import * as React from 'react'
import Curriculum from '../../pages/curriculum'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import GET_SESSION from '../../graphql/queries/getSession'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'
import { Session, Lesson } from '../../graphql/index'
export default {
  component: Curriculum,
  title: 'Pages/Curriculum'
}

export const Basic: React.FC = () => {
  const mocks = [
    {
      request: { query: GET_SESSION },
      result: { data: { session: dummySessionData } }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum lessons={dummyLessonData as Lesson[]} />
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

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum lessons={dummyLessonData as Lesson[]} />
    </MockedProvider>
  )
}

export const CompletedLessons: React.FC<{}> = () => {
  const session: Session = {
    user: {
      id: 1,
      username: 'fakeusername',
      name: 'fake user',
      email: 'fake@fakemail.com',
      isAdmin: true
    },
    submissions: [],
    lessonStatus: [
      {
        id: 1,
        lessonId: 5,
        isPassed: 'true',
        isTeaching: 'true',
        isEnrolled: 'false',
        starGiven: null
      },
      {
        id: 2,
        lessonId: 2,
        isPassed: 'true',
        isTeaching: 'true',
        isEnrolled: 'false',
        starGiven: null
      },
      {
        id: 3,
        lessonId: 1,
        isPassed: 'true',
        isTeaching: 'true',
        isEnrolled: 'false',
        starGiven: null
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
          alerts: dummyAlertData
        }
      }
    }
  ]

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Curriculum lessons={dummyLessonData as Lesson[]} />
    </MockedProvider>
  )
}
