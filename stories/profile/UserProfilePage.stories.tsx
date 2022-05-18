import React from 'react'
import UserProfile from '../../pages/profile/[username]'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import USER_INFO from '../../graphql/queries/userInfo'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyStarsData from '../../__dummy__/starsData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'
import { Session } from '../../graphql'
import { Star } from '../../graphql/index'
import { useRouter } from 'next/router'

export default {
  component: UserProfile,
  title: 'Pages/UserProfile'
}

const session: Session = {
  ...dummySessionData,
  lessonStatus: [
    {
      id: 1,
      userId: '1',
      lessonId: 5,
      passedAt: `'true'`,
      starGiven: null,
      starsReceived: [dummyStarsData[0] as Star]
    },
    {
      id: 2,
      userId: '1',
      lessonId: 2,
      passedAt: Date.now().toString(),
      starGiven: null,
      starsReceived: [dummyStarsData[1] as Star]
    },
    {
      id: 3,
      userId: '1',
      lessonId: 1,
      passedAt: Date.now().toString(),
      starGiven: null,
      starsReceived: [dummyStarsData[2] as Star, dummyStarsData[9] as Star]
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
  const { query } = useRouter()
  query['username'] = 'fakeusername'

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}

export const _UserProfileFewComments: React.FC = () => {
  const { query } = useRouter()
  query['username'] = 'fakeusername'

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}

export const _UserProfileManyComments: React.FC = () => {
  const { query } = useRouter()
  query['username'] = 'fakeusername'

  return withTestRouter(
    <MockedProvider mocks={mocks} addTypename={false}>
      <UserProfile />
    </MockedProvider>
  )
}
