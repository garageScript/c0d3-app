jest.mock('@apollo/client')
import { useQuery } from '@apollo/client'
import * as React from 'react'
import LessonCard from './LessonCard'
import { render, screen } from '@testing-library/react'
import { SubmissionStatus } from '../../graphql'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

describe('Lesson Card Complete State', () => {
  const props = {
    challengesUrl: '/challengeUrl',
    reviewUrl: '/reviewUrl'
  }
  test('Should render lessonCard with null if no data', async () => {
    useQuery.mockReturnValue({
      data: null
    })

    const { container } = render(
      <LessonCard {...props} currentState="completed" />
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render lessonCard with loading...', async () => {
    useQuery.mockReturnValue({
      loading: true
    })

    const { container } = render(
      <LessonCard {...props} currentState="completed" />
    )
    expect(container).toMatchSnapshot()
  })

  test('Should render lessonCard with submission count', async () => {
    useQuery.mockReturnValue({
      data: {
        submissions: [
          {
            status: SubmissionStatus.Open
          },
          {
            status: SubmissionStatus.Open
          },
          {
            status: SubmissionStatus.NeedMoreWork
          }
        ]
      }
    })

    render(<LessonCard {...props} currentState="completed" />)

    expect(
      screen.getAllByTestId('review-submissions-count')[0]
    ).toBeInTheDocument()
  })

  test('Should render lessonCard with no submission count', async () => {
    useQuery.mockReturnValue({
      data: {
        submissions: []
      }
    })

    render(<LessonCard {...props} currentState="completed" />)

    expect(
      screen.queryByTestId('review-submissions-count')
    ).not.toBeInTheDocument()
  })
})

describe('Lesson Card', () => {
  const props = {
    challengesUrl: '/challengeUrl',
    reviewUrl: '/reviewUrl'
  }
  test('Should render loading card when loading', async () => {
    useQuery.mockReturnValue({
      loading: true
    })

    const { container } = render(<LessonCard {...props} />)
    expect(container).toMatchSnapshot()
  })
  test('Should render ellpsis when no data is present', async () => {
    useQuery.mockReturnValue({
      loading: false
    })

    const { container } = render(<LessonCard {...props} />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with no submission count', async () => {
    useQuery.mockReturnValue({
      data: {
        submissions: []
      }
    })

    const { container } = render(<LessonCard {...props} />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with inProgress currentState prop', async () => {
    const { container } = render(
      <LessonCard {...props} currentState="inProgress" />
    )
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with lessonId prop', async () => {
    const { container } = render(<LessonCard {...props} lessonId={4} />)
    expect(container).toMatchSnapshot()
  })
})
