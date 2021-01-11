import React from 'react'
import Curriculum from '../../pages/curriculum'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'

describe('Curriculum Page', () => {
  test('Should render Loading Spinner when loading', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: dummyLessonData,
            session: dummySessionData,
            alerts: []
          }
        }
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    await waitFor(() => getByRole('heading', { name: /loading/i }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render Error on error', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        error: new Error('error')
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    await waitFor(() => getByRole('heading', { name: 'Error' }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render Bad Data when no session', async () => {
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

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    await waitFor(() => getByRole('heading', { name: 'Bad Data' }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render with basic dummy data', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: dummyLessonData,
            session: dummySessionData,
            alerts: []
          }
        }
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    await waitFor(() => getByRole('link', { name: 'C0D3' }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  test('Should render with lessonStatus data', async () => {
    const session = {
      ...dummySessionData,
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
          isPassed: true,
          isTeaching: true,
          isEnrolled: false,
          starGiven: null
        },
        {
          lessonId: '1',
          isPassed: true,
          isTeaching: true,
          isEnrolled: false,
          starGiven: null
        }
      ]
    }

    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            session,
            lessons: dummyLessonData,
            alerts: []
          }
        }
      }
    ]

    const { container, getByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    await waitFor(() => getByRole('link', { name: 'C0D3' }))

    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
