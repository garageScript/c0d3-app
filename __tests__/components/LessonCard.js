jest.mock('@apollo/react-hooks')
import * as React from 'react'
import LessonCard from '../../components/LessonCard'
import { useQuery } from '@apollo/react-hooks'
import { render } from '@testing-library/react'

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
            status: 'open'
          },
          {
            status: 'open'
          },
          {
            status: 'needMoreWork'
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
        submissions: [
          {
            status: 'underReview'
          },
          {
            status: 'underReview'
          }
        ]
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
