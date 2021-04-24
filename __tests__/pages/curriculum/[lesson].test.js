import React from 'react'
import { render, waitFor, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../../graphql/queries/getApp'
import Lesson from '../../../pages/curriculum/[lesson]'
import dummyLessonData from '../../../__dummy__/lessonData'
import dummySessionData from '../../../__dummy__/sessionData'
import dummyAlertData from '../../../__dummy__/alertData'
import { useRouter } from 'next/router'
import { SubmissionStatus } from '../../../graphql'

const session = {
  ...dummySessionData,
  submissions: [
    {
      id: '1',
      status: SubmissionStatus.Passed,
      mrUrl: '',
      diff: '',
      viewCount: 0,
      comment: '',
      order: 0,
      challengeId: '146',
      lessonId: '2',
      reviewer: {
        id: '1',
        username: 'fake reviewer'
      },
      createdAt: '123',
      updatedAt: '123'
    },
    {
      id: '1',
      status: SubmissionStatus.Passed,
      mrUrl: '',
      diff: '',
      viewCount: 0,
      comment: '',
      order: 0,
      challengeId: '145',
      lessonId: '2',
      reviewer: {
        id: '1',
        username: 'fake reviewer'
      },
      createdAt: '123',
      updatedAt: '123'
    }
  ],
  lessonStatus: [
    {
      lessonId: '5',
      isPassed: true,
      isTeaching: true,
      isEnrolled: false,
      starGiven: null
    },
    {
      lessonId: '2',
      isPassed: false,
      isTeaching: false,
      isEnrolled: true,
      starGiven: null
    }
  ]
}
describe('Lesson Page', () => {
  const { query } = useRouter()
  query['lesson'] = '2'
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

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render correctly with invalid lesson route', async () => {
    query['lesson'] = '100'
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
    query['lesson'] = '25'
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

    await waitFor(() => expect(container).toMatchSnapshot())
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
    query['lesson'] = '2'
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
})
