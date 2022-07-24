import '../../../__mocks__/useBreakpoint.mock'
import React from 'react'
import {
  render,
  waitFor,
  screen,
  waitForElementToBeRemoved,
  act
} from '@testing-library/react'
import '@testing-library/jest-dom'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../../graphql/queries/getApp'
import Lesson from '../../../pages/curriculum/[lessonSlug]'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import dummyAlertData from '../../../__dummy__/alertData'
import { useRouter } from 'next/router'
import { SubmissionStatus } from '../../../graphql'

const session = {
  ...dummySessionData,
  submissions: [
    {
      id: 1,
      status: SubmissionStatus.Passed,
      mrUrl: '',
      diff: '',
      viewCount: 0,
      comment: '',
      order: 0,
      challengeId: 146,
      lessonId: 2,
      reviewer: {
        id: 1,
        username: 'fake reviewer'
      },
      createdAt: '123',
      updatedAt: '123',
      comments: null,
      user: {
        id: 1
      }
    },
    {
      id: 1,
      status: SubmissionStatus.Passed,
      mrUrl: '',
      diff: '',
      viewCount: 0,
      comment: '',
      order: 0,
      challengeId: 145,
      lessonId: 2,
      reviewer: {
        id: 1,
        username: 'fake reviewer'
      },
      createdAt: '123',
      updatedAt: '123',
      comments: null,
      user: {
        id: 1
      }
    }
  ],
  lessonStatus: [
    {
      lessonId: 5,
      passedAt: new Date(),
      starGiven: null
    },
    {
      lessonId: 2,
      passedAt: null,
      starGiven: null
    }
  ]
}
describe('Lesson Page', () => {
  const { query } = useRouter()
  query['lessonSlug'] = 'js1'
  test('Should render correctly with valid lesson route', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: dummyAlertData
          }
        }
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )

    await waitFor(() =>
      getByRole('heading', { name: /Variables & Functions/i })
    )

    // Used to wait for the query response to arrive
    await act(async () => await new Promise(res => setTimeout(() => res(), 0)))

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render correctly with invalid lesson route', async () => {
    query['lessonSlug'] = 'js100'
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: dummyAlertData
          }
        }
      }
    ]
    const { container, getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )

    await waitFor(() => getByText(/Page not found/i))

    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test("Should correctly render challenges page for students who hadn't passed previous lessons", async () => {
    query['lessonSlug'] = 'js8'
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: dummyAlertData
          }
        }
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )

    await waitFor(() => getByRole('heading', { name: /Trees/i }))

    await new Promise(res => setTimeout(res, 0))

    expect(container).toMatchSnapshot()
  })
  test('Should return Internal server Error if alerts or lessons are missing', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: null,
            alerts: dummyAlertData
          }
        }
      }
    ]

    const { container, findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )

    const element = await findByText(/Internal server error/i)
    expect(element).toBeTruthy()

    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should render with nulled submissions', async () => {
    query['lessonSlug'] = 'js1'
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session: { ...session, submissions: null },
            lessons: dummyLessonData,
            alerts: dummyAlertData
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Variables & Functions/i })
    )
  })
  test('Should return loading spinner if useRouter is not ready', async () => {
    useRouter.mockImplementation(() => ({
      isReady: false
    }))
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: dummyAlertData
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>
    )
    //there are two spinners, one frow withQueryLoader, another from useRouter, so we need to wait to test the second one
    expect(
      await waitForElementToBeRemoved(() => screen.queryByText('Loading...'), {
        onTimeout: () => {}
      })
    ).toBeNull()
  })
})
