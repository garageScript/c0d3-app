import * as React from 'react'
import Curriculum from '../../pages/curriculum'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import GET_SESSION from '../../graphql/queries/getSession'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
import { withTestRouter } from '../../__tests__/utils/withTestRouter'
import { Session, Lesson, Alert } from '../../graphql/index'
import fetchMock from 'fetch-mock'

export default {
  component: Curriculum,
  title: 'Pages/Curriculum'
}

export const Basic = {
  render: () => {
    fetchMock
      .restore()
      .mock('*', { presence_count: 0, status: 200, members: [] })

    const mocks = [
      {
        request: { query: GET_SESSION },
        result: { data: { session: dummySessionData } }
      }
    ]

    return withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum
          lessons={dummyLessonData as Lesson[]}
          alerts={dummyAlertData as unknown as Alert[]}
        />
      </MockedProvider>
    )
  }
}

// export const Basic: React.FC = () => {

// }

// export const WithAlerts: React.FC = () => {
//   const mocks = [
//     {
//       request: { query: GET_APP },
//       result: {
//         data: {
//           lessons: dummyLessonData,
//           session: dummySessionData,
//           alerts: dummyAlertData
//         }
//       }
//     }
//   ]

//   return withTestRouter(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <Curriculum
//         lessons={dummyLessonData as Lesson[]}
//         alerts={dummyAlertData as unknown as Alert[]}
//       />
//     </MockedProvider>
//   )
// }

// export const CompletedLessons: React.FC<{}> = () => {
//   const session: Session = {
//     user: {
//       id: 1,
//       username: 'fakeusername',
//       name: 'fake user',
//       email: 'fake@fakemail.com',
//       isAdmin: true,
//       discordUserId: '',
//       discordUsername: '',
//       discordAvatarUrl: '',
//       isConnectedToDiscord: false
//     },
//     submissions: [],
//     lessonStatus: [
//       {
//         id: 1,
//         lessonId: 5,
//         passedAt: Date.now().toString(),
//         starGiven: null
//       },
//       {
//         id: 2,
//         lessonId: 2,
//         passedAt: Date.now().toString(),
//         starGiven: null
//       },
//       {
//         id: 3,
//         lessonId: 1,
//         passedAt: Date.now().toString(),
//         starGiven: null
//       }
//     ]
//   }

//   const mocks = [
//     {
//       request: { query: GET_APP },
//       result: {
//         data: {
//           lessons: dummyLessonData,
//           session,
//           alerts: dummyAlertData
//         }
//       }
//     }
//   ]

//   return withTestRouter(
//     <MockedProvider mocks={mocks} addTypename={false}>
//       <Curriculum
//         lessons={dummyLessonData as Lesson[]}
//         alerts={dummyAlertData as unknown as Alert[]}
//       />
//     </MockedProvider>
//   )
// }
