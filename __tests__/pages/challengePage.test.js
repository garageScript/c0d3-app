import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import { useRouter } from 'next/router'
import GET_APP from '../../graphql/queries/getApp'
import { withTestRouter } from '../../testUtil/withNextRouter'
import Lesson from '../../pages/curriculum/[lesson]'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
jest.mock('next/router')

const session = {
  ...dummySessionData,
  submissions: [
    {
      id: '1',
      status: 'passed',
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
      status: 'passed',
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
    useRouter.mockReturnValueOnce({
      query: {
        lesson: '2'
      }
    })
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '2' }
      }
    )

    const { container, getByRole } = render(tree)

    await waitFor(() =>
      getByRole('heading', { name: /Variables & Functions/i })
    )

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render correctly with invalid lesson route', async () => {
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
    useRouter.mockReturnValueOnce({
      query: {
        lesson: '100'
      }
    })
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '100' }
      }
    )

    const { container, getByRole } = render(tree)

    await waitFor(() => getByRole('link', { name: /c0d3/i }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })
  test('Should render 500 Error without session', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: dummyLessonData,
            session: null,
            alerts: []
          }
        }
      }
    ]
    useRouter.mockReturnValueOnce({
      query: {
        lesson: '2'
      }
    })
    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '2' }
      }
    )
    const element = await findByText(/Internal server error/i)
    expect(element).toBeTruthy()
  })
  it("Should correctly render challenges page for students who hadn't passed previous lessons", async () => {
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
    useRouter.mockReturnValueOnce({
      query: {
        lesson: '25'
      }
    })
    const tree = withTestRouter(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lesson />
      </MockedProvider>,
      {
        query: { lesson: '25' }
      }
    )

    const { container, getByRole } = render(tree)

    await waitFor(() => getByRole('heading', { name: /Trees/i }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
