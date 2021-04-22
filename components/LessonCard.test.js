jest.mock('@apollo/client')
import { useQuery } from '@apollo/client'
import * as React from 'react'
import LessonCard from './LessonCard'
import { render } from '@testing-library/react'
import { SubmissionStatus } from '../graphql'

describe('Lesson Card Complete State', () => {
  test('Should render lessonCard with null if no data', async () => {
    useQuery.mockReturnValue({
      data: null
    })

    const { container } = render(<LessonCard currentState="completed" />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with loading...', async () => {
    useQuery.mockReturnValue({
      loading: true
    })

    const { container } = render(<LessonCard currentState="completed" />)
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

    const { container } = render(<LessonCard currentState="completed" />)
    expect(container).toMatchSnapshot()
  })
})

describe('Lesson Card', () => {
  test('Should render loading card when loading', async () => {
    useQuery.mockReturnValue({
      loading: true
    })

    const { container } = render(<LessonCard />)
    expect(container).toMatchSnapshot()
  })
  test('Should render ellpsis when no data is present', async () => {
    useQuery.mockReturnValue({
      loading: false
    })

    const { container } = render(<LessonCard />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with no submission count', async () => {
    useQuery.mockReturnValue({
      data: {
        submissions: []
      }
    })

    const { container } = render(<LessonCard />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with inProgress currentState prop', async () => {
    const { container } = render(<LessonCard currentState="inProgress" />)
    expect(container).toMatchSnapshot()
  })
  test('Should render lessonCard with lessonId prop', async () => {
    const { container } = render(<LessonCard lessonId={4} />)
    expect(container).toMatchSnapshot()
  })
})
