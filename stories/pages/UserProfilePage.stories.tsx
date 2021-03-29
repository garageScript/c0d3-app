import React from 'react'
import UserProfile from '../../pages/profile/[username]'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import USER_INFO from '../../graphql/queries/userInfo'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyStarsData from '../../__dummy__/starsData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'

export default {
  component: UserProfile,
  title: 'Pages/UserProfile'
}

const session = {
  ...dummySessionData,
  lessonStatus: [
    {
      lessonId: '5',
      isPassed: true,
      isTeaching: true,
      isEnrolled: false,
      starGiven: null,
      starsReceived: [dummyStarsData[0]]
    },
    {
      lessonId: '2',
      isPassed: true,
      isTeaching: true,
      isEnrolled: false,
      starGiven: null,
      starsReceived: [dummyStarsData[1]]
    },
    {
      lessonId: '1',
      isPassed: true,
      isTeaching: true,
      isEnrolled: false,
      starGiven: null,
      starsReceived: [dummyStarsData[2], dummyStarsData[9]]
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
        username: 'fakeusername'
      }
    },
    result: {
      data: {
        lessons: dummyLessonData,
        userInfo: session
      }
    }
  }
]

export const _UserProfileZeroComments: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}

export const _UserProfileFewComments: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}

export const _UserProfileManyComments: React.FC = () => {
  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}
