jest.mock('@apollo/react-hooks')
jest.mock('../../components/LessonCard')
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import Curriculum from '../../pages/curriculum'
import { render, fireEvent } from '@testing-library/react'
import LessonCard from '../../components/LessonCard'

describe('Curriculum Page', () => {
  const alerts = [
    {
      id: '0',
      text: 'Set up your computer to submit challenges.',
      type: 'info',
      url:
        'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
      urlCaption: 'View Instructions'
    },
    {
      id: '1',
      text: 'Please upgrade your CLI client by running npm update c0d3.',
      type: 'urgent'
    }
  ]
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
        },
        alerts
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
        },
        alerts
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })

  test('Should render first lesson when lessonStatus is empty', async () => {
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
        },
        alerts
      }
    })
    LessonCard.mockReturnValue(<h1>LessonCard</h1>)
    const { container } = render(<Curriculum />)
    expect(container).toMatchSnapshot()
  })
})
