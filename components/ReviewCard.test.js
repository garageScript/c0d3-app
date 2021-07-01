import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ACCEPT_SUBMISSION from '../graphql/queries/acceptSubmission'
import ReviewCard from './ReviewCard'
import { MockedProvider } from '@apollo/client/testing'
import _ from 'lodash'
import '@testing-library/jest-dom'
import { SubmissionStatus } from '../graphql'
import dummySessionData from '../__dummy__/sessionData'
// correct javascript submission
const JsDiff =
  'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// a/js7/1.c b/js7/1.c instead of a/js7/1.js b/js7/1.js
const NonJsDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/js7/1.c\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// a/js7/1 b/js7/1 instead of a/js7/1.js b/js7/1.js
const IncorrectDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1\n+++ b/js7/1\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// .. instead of a/js7/1.js b/js7/1.js
const InCompleteDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/.\n+++ b/.\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'
// a/js7/1.c instead of a/js7/1.js b/js7/1.js
const NoNewPathDiff =
  'diff --git a/js7/1.c b/js7/1.c\nindex 9c96b34..853bddf 100644\n--- a/js7/1.c\n+++ b/\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;'

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
  createdAt: '1524401718267',
  updatedAt: '1524401718267',
  comments: [
    {
      author: {
        name: 'Admin Admin',
        username: 'admin'
      },
      autorId: 1,
      submissionId: 1,
      content: 'A comment under submission'
    }
  ]
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
          comment: 'good job',
          status: SubmissionStatus.Passed
        }
      }
    }
  }
]
describe('ReviewCard Component', () => {
  test('Should render submissions in other languages', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: NonJsDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render incorrect diff', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: IncorrectDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render incomplete diff', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: InCompleteDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render single path submission', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ReviewCard
          submissionData={{ ...submissionData, diff: NoNewPathDiff }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })
  test('Should be able to accept submission', async () => {
    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    userEvent.type(getByRole('textbox', { name: '' }), 'Good job!')
    userEvent.click(
      getByRole('radio', {
        name: 'Accept Submit feedback and approve submission'
      })
    )
    userEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )
    expect(container).toMatchSnapshot()
  })
  test('Should be able to reject submission', async () => {
    const { getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    userEvent.type(getByRole('textbox', { name: '' }), `This won't work`)
    userEvent.click(
      getByRole('radio', {
        name: 'Reject Request changes and reject submission'
      })
    )
    userEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )
  })
  test('Should be able to add comment', async () => {
    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={submissionData}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    userEvent.type(getByRole('textbox', { name: '' }), 'Good job!')
    userEvent.click(
      getByRole('radio', {
        name: 'Comment Submit general feedback without explicit approval'
      })
    )
    userEvent.click(
      getByRole('button', {
        name: 'Submit'
      })
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render reviewer with name', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            reviewer: {
              name: 'Admin admin'
            }
          }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(screen.queryByText('undefined')).toBeFalsy()
  })
  test('Should render submission without timestamp', async () => {
    render(
      <MockedProvider mocks={mocks} addTypeName={false}>
        <ReviewCard
          submissionData={{
            ...submissionData,
            updatedAt: null
          }}
          session={dummySessionData}
        />
      </MockedProvider>
    )
    expect(screen.getByText('52 years ago')).toBeVisible()
  })
})
