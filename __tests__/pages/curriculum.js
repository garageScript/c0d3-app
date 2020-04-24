jest.mock('@apollo/react-hooks')
jest.mock('../../components/LessonCard')
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Curriculum from '../../pages/curriculum'
import { render } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'

describe('Curriculum Page', () => {
  test('Should render loading when loading', async () => {
    useQuery.mockReturnValue({
      loading: true
    })

    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
  test('Should render ellpsis when no data is present', async () => {
    useQuery.mockReturnValue({
      loading: false
    })

    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
  test('Should render data with lesson state completed', async () => {
    useQuery.mockReturnValue({
      data: {
        curriculumStatus: [
          {
            id: 4,
            title: 'lesson 4',
            description: '4th lesson',
            order: 4,
            challenges: [
              {
                id: 4
              }
            ],
            currentUser: {
              userLesson: {}
            },
            docUrl: 'lesson4.com'
          },
          {
            id: 1,
            title: 'lesson 1',
            description: '1st lesson',
            order: 1,
            challenges: [
              {
                id: 1
              }
            ],
            currentUser: {
              userLesson: {}
            },
            docUrl: 'lesson1.com'
          }
        ]
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)

    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
  test('Should render data with lesson state inProgress', async () => {
    useQuery.mockReturnValue({
      data: {
        curriculumStatus: [
          {
            id: 4,
            title: 'lesson 4',
            description: '4th lesson',
            order: 4,
            challenges: [
              {
                id: 4
              }
            ],
            currentUser: {
              userLesson: {
                isPassed: '234234'
              }
            },
            docUrl: 'lesson4.com'
          },
          {
            id: 1,
            title: 'lesson 1',
            description: '1st lesson',
            order: 1,
            challenges: [
              {
                id: 1
              }
            ],
            currentUser: {
              userLesson: {
                isPassed: '9878990'
              }
            },
            docUrl: 'lesson1.com'
          }
        ]
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)

    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
})
