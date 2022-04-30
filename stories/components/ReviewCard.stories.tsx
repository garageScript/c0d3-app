import React from 'react'
import ReviewCard from '../../components/ReviewCard'
export default {
  component: ReviewCard,
  title: 'Components/ReviewCard'
}

import { MockedProvider } from '@apollo/client/testing'
import ACCEPT_SUBMISSION from '../../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../../graphql/queries/rejectSubmission'
import GET_PREVIOUS_SUBMISSIONS from '../../graphql/queries/getPreviousSubmissions'
import { Submission, SubmissionStatus } from '../../graphql'

const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'

const submissionData = {
  id: 1,
  status: SubmissionStatus.Open,
  diff: JsDiff,
  comment: 'Some comment',
  challengeId: 146,
  lessonId: 2,
  user: {
    username: 'fake user',
    id: 1,
    __typename: 'User'
  },
  challenge: {
    title: 'fake challenge',
    description: 'fake description',
    __typename: 'Challenge'
  },
  reviewer: {
    id: 1,
    username: 'fake reviewer',
    name: 'fake reviewer',
    __typename: 'Reviewer'
  },
  comments: [
    {
      id: 1,
      content: 'Some comment',
      submissionId: 1,
      createdAt: '1524401718267',
      authorId: 1,
      line: 24,
      fileName: 'Some line',
      author: {
        username: 'fake author',
        name: 'fake name',
        __typename: 'Author'
      },
      __typename: 'Comment'
    }
  ],
  createdAt: '1524401718267',
  updatedAt: '1524401718267',
  __typename: 'Submission'
}

const mocks = [
  {
    request: {
      query: ACCEPT_SUBMISSION,
      variables: { id: '1', comment: 'good job' }
    },
    result: {
      data: {
        acceptSubmission: {
          id: '1',
          comment: 'good job'
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        id: '1',
        comment: 'error on line 3'
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: '1',
          comment: 'error on line 3'
        }
      }
    }
  },
  {
    request: {
      query: GET_PREVIOUS_SUBMISSIONS,
      variables: {
        challengeId: 146,
        userId: 1
      }
    },
    result: {
      data: {
        getPreviousSubmissions: [submissionData]
      }
    }
  }
]

const user = {
  username: 'fake user',
  id: 1,
  isAdmin: false
}

export const ActiveCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={submissionData as Submission} />
  </MockedProvider>
)
export const NoLastName: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard
      submissionData={
        {
          ...submissionData,
          reviewer: {
            ...user,
            name: 'Admin admin',
            username: 'admin',
            email: 'admin@fakemail.com',
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          updatedAt: ''
        } as Submission
      }
    />
  </MockedProvider>
)
export const WithoutComment: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard
      submissionData={
        {
          ...submissionData,
          comment: null
        } as Submission
      }
    />
  </MockedProvider>
)
export const WithoutUsername: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard
      submissionData={
        {
          ...submissionData,
          reviewer: {
            ...user,
            username: 'admin',
            name: 'Admin Admin',
            email: 'admin@fakemail.com',
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          }
        } as Submission
      }
    />
  </MockedProvider>
)
export const WithLongComment: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard
      submissionData={
        {
          ...submissionData,
          reviewer: {
            ...user,
            name: 'Admin Admin',
            username: 'admin',
            email: 'admin@fakemail.com',
            discordUserId: '',
            discordUsername: '',
            discordAvatarUrl: '',
            isConnectedToDiscord: false
          },
          comment: `You almost got it! Using reduce inside a foreach loop isn't necessary and will make your solution run slower, what you can do here is make a map that will keep track of the numbers that you've already seen while updating the map.\n\nLet's say we have an array arr [9,7,2,3] and the sum is 10\n\nDoes 10 - arr[0] exist in the map? (No).\n\nUpdate map to { 9: true }\nDoes 10 - arr[1] exist in the map? (No).\n\nUpdate map to { 9: true, 7: true }\n\nDoes 10 - arr[2] exist in the map? (No).\n\nUpdate map to { 9: true, 7: true, 2: true }\n\nDoes 10 - arr[3] exist in the map? (Yes! 7 exist in the map). Return true\n\nif you have questions, don't hesitate to reach out in the chat.`
        } as Submission
      }
    />
  </MockedProvider>
)
export const NoDiffCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard
      submissionData={{ ...submissionData, diff: '' } as Submission}
    />
  </MockedProvider>
)
