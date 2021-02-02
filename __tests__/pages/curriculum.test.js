import React from 'react'
import Curriculum from '../../pages/curriculum'
import { render, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import Router from 'next/router'
Router.router = {
  push: jest
    .fn()
    .mockImplementation(path => (global.window.location.pathname = path))
}

// Mock global.window
global.window = Object.create(window)
Object.defineProperty(global.window, 'location', {
  value: { pathname: '/not-root' } // make sure pathname isnt '/' by default
})
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

    const { findByRole } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )

    const element = await findByRole('heading', { name: /loading/i })
    expect(element).toBeTruthy()
  })

  test('Should render Bad Data when no lessons', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        result: {
          data: {
            lessons: null,
            session: dummySessionData,
            alerts: []
          }
        }
      }
    ]

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )
    const element = await findByText(/Internal server error/i)
    expect(element).toBeTruthy()
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
  test('Should redirect to login page if unauthorized', async () => {
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
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )
    await waitFor(() =>
      expect(global.window.location.pathname).toEqual('/login')
    )
  })
  test('Should render Error on error', async () => {
    const mocks = [
      {
        request: { query: GET_APP },
        error: new Error('error')
      }
    ]

    const { findByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Curriculum />
      </MockedProvider>
    )
    const element = await findByText(/Internal server error/i)
    expect(element).toBeTruthy()
  })
})
