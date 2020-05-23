jest.mock('@apollo/react-hooks')
jest.mock('../../components/LessonCard')
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Curriculum from '../../pages/curriculum'
import { render } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'

describe('Curriculum Page', () => {
  test('Should render data with lesson state completed', async () => {
    useQuery.mockReturnValue({
      data: {
        lessons: [
          {
            challenges: [{ id: '4' }],
            id: '4'
          }
        ],
        session: {
          user: {
            username: 'test'
          },
          lessonStatus: [
            {
              lessonId: '4',
              isPassed: '1235435',
              isEnrolled: '123456'
            }
          ]
        }
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })

  test('Should render data with lesson state inProgress', async () => {
    useQuery.mockReturnValue({
      data: {
        lessons: [
          {
            challenges: [{ id: '4' }],
            id: '4'
          }
        ],
        session: {
          user: {
            username: 'test'
          },
          lessonStatus: [
            {
              lessonId: '4',
              isEnrolled: '123456'
            }
          ]
        }
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })

  test('Should render render first lesson when lessonStatus is empty', async () => {
    useQuery.mockReturnValue({
      data: {
        lessons: [
          {
            challenges: [{ id: '4' }],
            id: '4'
          }
        ],
        session: {
          user: {
            username: 'test'
          }
        }
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
})
