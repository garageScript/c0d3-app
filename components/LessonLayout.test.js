import '../__mocks__/useBreakpoint.mock'
import React from 'react'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import GET_SESSION from '../graphql/queries/getSession'
import dummySessionData from '../__dummy__/sessionData'
import '@testing-library/jest-dom'
import LessonLayout, { getLayout } from './LessonLayout'
import dummyLessonsData from '../__dummy__/lessonData'

describe('LessonLayout component', () => {
  const mocks = [
    {
      request: { query: GET_SESSION },
      result: {
        data: {
          session: {
            ...dummySessionData,
            lessonStatus: [
              {
                lessonId: 5,
                passedAt: new Date(),
                starGiven: null
              },
              {
                lessonId: 2,
                passedAt: new Date(),
                starGiven: null
              },
              {
                lessonId: 1,
                passedAt: new Date(),
                starGiven: null
              }
            ]
          }
        }
      }
    }
  ]

  const loggedOutMock = [
    {
      request: { query: GET_SESSION },
      result: {
        data: {
          session: {
            user: null,
            submissions: null,
            lessonStatus: []
          }
        }
      }
    }
  ]
  test('should render when user is not logged in', async () => {
    const lesson = dummyLessonsData[3] //lesson.id = 4
    render(
      <MockedProvider mocks={loggedOutMock} addTypename={false}>
        <LessonLayout lesson={lesson} />
      </MockedProvider>
    )
    expect(screen.queryByText(/lesson/i)).toBeInTheDocument()
    expect(screen.queryByText(/challenge/i)).toBeInTheDocument()
    expect(screen.queryByText(/review/i)).not.toBeInTheDocument()
  })
  test('should not render review link if user has not passed the lesson', async () => {
    const lesson = dummyLessonsData[3] //lesson.id = 4
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LessonLayout lesson={lesson} />
      </MockedProvider>
    )

    expect(screen.queryByText(lesson.title)).toBeInTheDocument()
    expect(screen.queryByText(/lesson/i)).toBeInTheDocument()
    expect(screen.queryByText(/challenges/i)).toBeInTheDocument()
    expect(screen.queryByText(/review/i)).not.toBeInTheDocument()
  })
  test('should render review link if lesson is passed', async () => {
    const lesson = dummyLessonsData[0] //lesson.id = 5
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LessonLayout lesson={lesson} />
      </MockedProvider>
    )

    expect(await screen.findByText(/review/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /review/i })).toHaveAttribute(
      'href',
      '/review/js0'
    )
  })

  test('getLayout should return page wrapped in LessonLayout wrapped in app Layout', () => {
    const Page = jest.fn(() => <> This is My Page </>)
    const pageProps = {
      lesson: dummyLessonsData[0] // lesson.id = 5
    }
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        {getLayout(<Page {...pageProps} />, pageProps)}
      </MockedProvider>
    )
    expect(Page).toHaveBeenCalledWith(pageProps, {})
  })
})
