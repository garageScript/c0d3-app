import * as React from 'react'
import LessonCard from '../../components/LessonCard'
import { MockedProvider } from '@apollo/client/testing'
import GET_SUBMISSIONS from '../../graphql/queries/getSubmissions'
import { SubmissionStatus } from '../../graphql'

export default {
  component: LessonCard,
  title: 'Components/LessonCard'
}

/*
  TODO Storybook should focus on UI only.
  LessonCard/ReviewCount uses query that relies on client Context from the Apollo Provider.
  Refer to issue #275: https://github.com/garageScript/c0d3-app/issues/275
*/

const mocks = [
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: { lessonId: '4' }
    },
    result: {
      data: {
        submissions: [
          {
            id: '',
            status: SubmissionStatus.Open,
            diff: '',
            comment: '',
            challengeId: '0',
            user: {
              id: '0',
              username: 'First Last',
              __typename: 'User'
            },
            createdAt: '0000000000000',
            updatedAt: '0000000000000',
            __typename: 'Submission'
          },
          {
            id: '',
            status: SubmissionStatus.Open,
            diff: '',
            comment: '',
            challengeId: '1',
            user: {
              id: '1',
              username: 'First Last',
              __typename: 'User'
            },
            createdAt: '1111111111111',
            updatedAt: '1111111111111',
            __typename: 'Submission'
          }
        ]
      }
    }
  }
]

export const Basic: React.FC = () => (
  <MockedProvider>
    <LessonCard
      lessonId={4}
      coverImg={`js-4-cover.svg`}
      title={`HTML, CSS, JavaScript`}
      challengeCount={7}
      description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
      reviewUrl="/review/js0"
      challengesUrl="/curriculum/js0"
      docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
    />
  </MockedProvider>
)

export const withInProgress: React.FC = () => (
  <MockedProvider>
    <LessonCard
      lessonId={4}
      coverImg={`js-4-cover.svg`}
      title={`HTML, CSS, JavaScript`}
      challengeCount={7}
      description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
      currentState="inProgress"
      reviewUrl="/review/js0"
      challengesUrl="/curriculum/js0"
      docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
    />
  </MockedProvider>
)

export const withCompleted: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <LessonCard
      lessonId={4}
      coverImg={`js-4-cover.svg`}
      title={`HTML, CSS, JavaScript`}
      challengeCount={7}
      description={`Create basic Front-End Mini-Projects that demonstrate User Interface logic and understanding of Web Development.`}
      currentState="completed"
      reviewUrl="/review/js0"
      challengesUrl="/curriculum/js0"
      docUrl="https://www.notion.so/JS-4-Front-End-Engineering-c59fbdd58dcc4214956f7856e0892b52"
    />
  </MockedProvider>
)
