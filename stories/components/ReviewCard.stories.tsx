import React from 'react'
import ReviewCard from '../../components/ReviewCard'
export default {
  component: ReviewCard,
  title: 'Components/ReviewCard'
}

import { MockedProvider } from '@apollo/client/testing'
import ACCEPT_SUBMISSION from '../../graphql/queries/acceptSubmission'
import REJECT_SUBMISSION from '../../graphql/queries/rejectSubmission'
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
          comment: 'good job',
          status: 'passed'
        }
      }
    }
  },
  {
    request: {
      query: REJECT_SUBMISSION,
      variables: {
        id: '1',
        comment: 'error on line 3',
        status: 'active'
      }
    },
    result: {
      data: {
        rejectSubmission: {
          id: '1',
          comment: 'error on line 3',
          status: 'active'
        }
      }
    }
  }
]
const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
const submissionData = {
  id: '1',
  status: 'active',
  mrUrl: '',
  diff: JsDiff,
  viewCount: 0,
  comment: 'Some comment',
  order: 0,
  challengeId: '146',
  lessonId: '2',
  user: {
    username: 'fake user',
    id: '1'
  },
  challenge: { title: 'fake challenge' },
  reviewer: {
    id: '1',
    username: 'fake reviewer'
  },
  createdAt: '123',
  updatedAt: '123'
}

export const ActiveCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={submissionData} />
  </MockedProvider>
)
export const NoDiffCard: React.FC = () => (
  <MockedProvider mocks={mocks}>
    <ReviewCard submissionData={{ ...submissionData, diff: '' }} />
  </MockedProvider>
)
