jest.mock('@apollo/react-hooks')
jest.mock('../../components/LessonCard')
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Curriculum from '../../pages/curriculum'
import { render } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'
import Layout from '../../components/Layout'
import ProgressCard from '../../components/ProgressCard'
import AnnouncementCard from '../../components/AnnouncementCard'
import AdditionalResources from '../../components/AdditionalResources'

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
    const { container, debug } = render(<Curriculum />)
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
    const { container, debug } = render(<Curriculum />)
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
          },
          lessonStatus: []
        }
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container, debug } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
  /*
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
  })*/
})
