import '../../../__mocks__/useBreakpoint.mock'
import React from 'react'
import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../../graphql/queries/getApp'
import GET_SESSION from '../../../graphql/queries/getSession'
import GET_SUBMISSIONS from '../../../graphql/queries/getSubmissions'
import Review from '../../../pages/review/[lesson]'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import dummyAlertData from '../../../__dummy__/alertData'
import { useRouter } from 'next/router'
import expectLoading from '../../utils/expectLoading'
import getPreviousSubmissions from '../../../__dummy__/getPreviousSubmissionsData'
import GET_PREVIOUS_SUBMISSIONS from '../../../graphql/queries/getPreviousSubmissions'

const getAppMock = {
  request: { query: GET_APP },
  result: {
    data: {
      session: {
        ...dummySessionData,
        lessonStatus: [
          {
            lessonId: 2,
            passedAt: new Date(1614694120099),
            starGiven: null
          }
        ]
      },
      lessons: dummyLessonData,
      alerts: dummyAlertData
    }
  }
}
const getSubmissionsMock = {
  request: { query: GET_SUBMISSIONS, variables: { lessonId: 2 } },
  result: {
    data: {
      submissions: [
        {
          id: 1,
          status: 'open',
          diff: 'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n',
          comment: 'TEST 2',
          challenge: {
            title: 'Sum of 2 Numbers',
            description:
              "Write a function that takes in 2 numbers and returns their sum. Here's how another developer might use your function: solution(5,9) // Should return 14 solution(4,1) // Should return 5",
            __typename: 'Challenge'
          },
          challengeId: 107,
          lessonId: 5,
          user: {
            id: '6',
            username: 'newbie'
          },
          reviewer: {
            id: '0',
            username: 'admin',
            name: 'Admin Admin',
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
      ]
    }
  }
}
const getPreviousSubmissionsMock = {
  request: {
    query: GET_PREVIOUS_SUBMISSIONS,
    variables: { challengeId: 107, userId: '6' }
  },
  result: {
    data: getPreviousSubmissions
  }
}

const getSessionMock = {
  request: { query: GET_SESSION },
  result: {
    data: {
      session: {
        ...dummySessionData,
        lessonStatus: [
          {
            lessonId: 2,
            passedAt: new Date(1614694120099),
            starGiven: null
          }
        ]
      }
    }
  }
}

const mocks = [
  getAppMock,
  getSubmissionsMock,
  getPreviousSubmissionsMock,
  getSessionMock
]
describe('Lesson Page', () => {
  const { query, push, asPath } = useRouter()
  query['lesson'] = 'js1'
  test('Should render new submissions', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Review />
      </MockedProvider>
    )
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'newbie - Sum of 2 Numbers' })
      ).toBeTruthy()
    )
    expect(await screen.findByTestId('iteration 1')).toBeVisible()
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should return loading spinner when loading', () => {
    expectLoading(<Review />)
  })
  test('Should redirect to login if no user is logged in', async () => {
    const noSessionMock = {
      request: { query: GET_APP },
      result: {
        data: {
          session: null,
          lessons: dummyLessonData,
          alerts: dummyAlertData
        }
      }
    }
    render(
      <MockedProvider
        mocks={[noSessionMock, getSubmissionsMock]}
        addTypename={false}
      >
        <Review />
      </MockedProvider>
    )

    await waitFor(() =>
      expect(push).toBeCalledWith({
        pathname: '/login',
        query: { next: asPath }
      })
    )
  })
  test("Should redirect to curriculum if user hasn't completed lesson yet", async () => {
    const noSessionMock = {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: dummyLessonData,
          alerts: dummyAlertData
        }
      }
    }
    render(
      <MockedProvider
        mocks={[noSessionMock, getSubmissionsMock]}
        addTypename={false}
      >
        <Review />
      </MockedProvider>
    )
    await waitFor(() => expect(push).toBeCalledWith('/curriculum'))
  })
  test('Should render empty submissions', async () => {
    const noSubmissionMock = { ...getSubmissionsMock, result: null }
    const { container } = render(
      <MockedProvider
        mocks={[getAppMock, noSubmissionMock, getSessionMock]}
        addTypename={false}
      >
        <Review />
      </MockedProvider>
    )

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'))
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should render Error component if route is invalid', async () => {
    query['lesson'] = '100'
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Review />
      </MockedProvider>
    )
    await waitFor(() => screen.getAllByText(/Page not found/i))

    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
