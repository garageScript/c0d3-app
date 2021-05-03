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
import GET_SUBMISSONS from '../../../graphql/queries/getSubmissions'
import Review from '../../../pages/review/[lesson]'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import dummyAlertData from '../../../__dummy__/alertData'
import { useRouter } from 'next/router'
import expectLoading from '../../utils/expectLoading'

const getAppMock = {
  request: { query: GET_APP },
  result: {
    data: {
      session: {
        ...dummySessionData,
        lessonStatus: [
          {
            lessonId: 2,
            isPassed: '1614694120099', // this column is a timestamp on the DB
            isTeaching: null,
            isEnrolled: null,
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
  request: { query: GET_SUBMISSONS, variables: { lessonId: 2 } },
  result: {
    data: {
      submissions: [
        {
          id: 1,
          status: 'open',
          diff:
            'diff --git a/js7/1.js b/js7/1.js\nindex 9c96b34..853bddf 100644\n--- a/js7/1.js\n+++ b/js7/1.js\n@@ -1,8 +1,19 @@\n-// write your code here!\n const solution = () => {\n-  // global clear all timeout:\n+  const allT = [];\n+  const old = setTimeout;\n+  window.setTimeout = (func, delay) => {\n+    const realTimeout = old(func, delay);\n+    allT.push(realTimeout);\n+    return realTimeout;\n+  };\n+  window.clearAllTimouts = () => {\n+    while (allT.length) {\n+      clearTimeout(allT.pop());\n+    }\n+  };\n   cat = () => {\n-  }\n+    window.clearAllTimouts();\n+  };\n };\n \n module.exports = solution;\n',
          comment: 'TEST 2',
          challenge: {
            title: 'Sum of 1 Numbers'
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
            name: 'Admin Admin'
          },
          createdAt: '',
          updatedAt: ''
        }
      ]
    }
  }
}
const mocks = [getAppMock, getSubmissionsMock]
describe('Lesson Page', () => {
  const { query, push } = useRouter()
  query['lesson'] = '2'
  test('Should render new submissions', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Review />
      </MockedProvider>
    )
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'newbie - Sum of 1 Numbers' })
      ).toBeTruthy()
    )
    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should return loading spinner when loading', () => {
    expectLoading(<Review />)
  })
  test('Should redirect to login if no session', async () => {
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

    await waitFor(() => expect(push).toBeCalledWith('/login'))
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
        mocks={[getAppMock, noSubmissionMock]}
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
