import * as React from 'react'
import ChallengeMaterial from '../../components/ChallengeMaterial'
import SET_STAR from '../../graphql/queries/setStar'
import GET_LESSON_MENTORS from '../../graphql/queries/getLessonMentors'
import lessonMentorsData from '../../__dummy__/getLessonMentorsData'
import { MockedProvider } from '@apollo/client/testing'
import { SubmissionStatus } from '../../graphql'
export default {
  component: ChallengeMaterial,
  title: 'Components/ChallengeMaterial'
}
const mocks = [
  {
    request: {
      query: SET_STAR,
      variables: { mentorId: 4, lessonId: 5, comment: '1' }
    },
    result: {
      data: { setStar: { success: true } }
    }
  },
  {
    request: { query: GET_LESSON_MENTORS, variables: { lessonId: '5' } },
    result: {
      data: { getLessonMentors: lessonMentorsData }
    }
  }
]
const challenges = [
  {
    description:
      'Write a function that takes in a number and returns true if that number is greater than 5. Otherwise, return false.',
    id: 105,
    order: 0,
    title: 'Greater than 5',
    lessonId: 23,
    challengeId: 105
  },
  {
    description:
      'Write a function that takes in 2 numbers and returns their sum.',
    id: 107,
    order: 1,
    title: 'Sum of 2 Numbers',
    lessonId: 23,
    challengeId: 105
  }
]

const lessonStatus = {
  id: 1,
  lessonId: 5
}

export const Basic: React.FC = () => (
  <MockedProvider>
    <ChallengeMaterial
      challenges={challenges}
      userSubmissions={[]}
      lessonStatus={lessonStatus}
      chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
      lessonId={5}
      lessonSlug={'js0'}
      show={false}
      setShow={() => {}}
    />
  </MockedProvider>
)

export const WithDiff: React.FC = () => (
  <MockedProvider>
    <ChallengeMaterial
      challenges={challenges}
      userSubmissions={[
        {
          status: SubmissionStatus.Open,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```test comment```',
          lessonId: 23,
          challengeId: 105,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '',
          createdAt: '',
          updatedAt: Date.now().toString()
        },
        {
          status: SubmissionStatus.Open,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```test comment```',
          lessonId: 23,
          challengeId: 107,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            discordUserId: '',
            isAdmin: false,
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '',
          createdAt: '',
          updatedAt: Date.now().toString()
        }
      ]}
      lessonStatus={lessonStatus}
      chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
      lessonId={5}
      lessonSlug={'js0'}
      show={false}
      setShow={() => {}}
    />
  </MockedProvider>
)

export const WithComments: React.FC = () => (
  <MockedProvider>
    <ChallengeMaterial
      challenges={challenges}
      userSubmissions={[
        {
          status: SubmissionStatus.Passed,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```Great Job```',
          lessonId: 23,
          challengeId: 105,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewer: {
            id: 1,
            username: 'dan',
            name: 'danny boy',
            email: 'danny@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '1',
          createdAt: '',
          updatedAt: Date.now().toString()
        },
        {
          status: SubmissionStatus.Open,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```test comment```',
          lessonId: 23,
          challengeId: 107,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '',
          createdAt: '',
          updatedAt: Date.now().toString()
        }
      ]}
      lessonStatus={lessonStatus}
      chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
      lessonId={5}
      lessonSlug={'js0'}
      show={false}
      setShow={() => {}}
    />
  </MockedProvider>
)

export const NoChallenges: React.FC = () => (
  <ChallengeMaterial
    challenges={[]}
    userSubmissions={[]}
    lessonStatus={lessonStatus}
    chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
    lessonId={5}
    lessonSlug={'js0'}
    show={false}
    setShow={() => {}}
  />
)

export const FinalChallenge: React.FC = () => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ChallengeMaterial
      challenges={challenges}
      userSubmissions={[
        {
          status: SubmissionStatus.Passed,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```Great Job```',
          lessonId: 23,
          challengeId: 105,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewer: {
            id: 1,
            username: 'dan',
            name: 'danny boy',
            email: 'danny@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '1',
          createdAt: '',
          updatedAt: Date.now().toString()
        },
        {
          status: SubmissionStatus.Passed,
          id: 1,
          mrUrl: '',
          diff: `diff --git a/curriculum/js0/2.js b/curriculum/js0/2.js\nindex 647ca32..ac44196 100644\n--- a/curriculum/js0/2.js\n+++ b/curriculum/js0/2.js\n@@ -7,7 +7,7 @@\n  */\n \n const solution = (a, b, c) => {\n-  return 0;\n+  return a + b + c;\n };\n \n module.exports = {\n`,
          viewCount: 0,
          comment: '```test comment```',
          lessonId: 23,
          challengeId: 107,
          challenge: {
            id: 1,
            title: 'fake challenge',
            description: 'fake description',
            order: 1,
            lessonId: 23
          },
          user: {
            id: 1,
            username: 'fakeuser',
            name: 'fake user',
            email: 'fake@fakemail.com',
            isAdmin: false,
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          reviewerId: '',
          createdAt: '',
          updatedAt: Date.now().toString()
        }
      ]}
      lessonStatus={{ ...lessonStatus, passedAt: 'aef' }}
      chatUrl="https://chat.c0d3.com/c0d3/channels/js0-foundations"
      lessonId={5}
      lessonSlug={'js0'}
      show={false}
      setShow={() => {}}
    />
  </MockedProvider>
)
