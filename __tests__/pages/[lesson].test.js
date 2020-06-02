jest.mock('next/router')
jest.mock('@apollo/react-hooks')
jest.mock('../../components/LessonCard')
import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import Lesson from '../../pages/curriculum/[lesson]'
import { render } from '@testing-library/react'

describe('Lesson Page', () => {
  useQuery.mockReturnValue({
    data: {
      lessons: [
        {
          id: '5',
          title: 'Foundations of JavaScript',
          description: 'A super simple introduction to help you get started!',
          docUrl:
            'https://www.notion.so/garagescript/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672',
          githubUrl: '',
          videoUrl:
            'https://www.youtube.com/watch?v=H-eqRQo8KoI&list=PLKmS5c0UNZmewGBWlz0l9GZwh3bV8Rlc7&index=1',
          order: 0,
          challenges: [
            {
              id: '107',
              title: 'Sum of 2 Numbers',
              description:
                "Write a function that takes in 2 numbers and returns their sum.\n\nHere's how another developer might use your function:\n\n```\nsolution(5,9) // Should return 14\nsolution(4,1) // Should return 5\n```",
              order: 1,
              __typename: 'Challenge'
            },
            {
              id: '108',
              title: 'Sum of 3 Numbers',
              description:
                "Write a function that takes in 3 numbers and returns their sum.\n\nHere's how another developer might use your function:\n\n```\nsolution(5,9,2) // Should return 16\nsolution(4,1,9) // Should return 14\n```",
              order: 2,
              __typename: 'Challenge'
            }
          ]
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
        ],
        submissions: [
          {
            id: '6050',
            status: 'open',
            mrUrl: null,
            diff:
              '\u001b[1mdiff --git a/index.js b/index.js\u001b[m\n\u001b[1mindex 5e1c309..0929f9d 100644\u001b[m\n\u001b[1m--- a/index.js\u001b[m\n\u001b[1m+++ b/index.js\u001b[m\n\u001b[36m@@ -1 +1 @@\u001b[m\n\u001b[31m-Hello World\u001b[m\n\\ No newline at end of file\u001b[m\n\u001b[32m+\u001b[m\u001b[32mHello to the new c0d3 CLI\u001b[m\n',
            viewCount: 0,
            comment: null,
            order: null,
            challengeId: '108',
            lessonId: '5',
            reviewer: null,
            createdAt: '1589315948051',
            updatedAt: '1589315948098',
            __typename: 'Submission'
          },
          {
            id: '6048',
            status: 'open',
            mrUrl: null,
            diff:
              '\u001b[1mdiff --git a/index.js b/index.js\u001b[m\n\u001b[1mindex 5e1c309..0929f9d 100644\u001b[m\n\u001b[1m--- a/index.js\u001b[m\n\u001b[1m+++ b/index.js\u001b[m\n\u001b[36m@@ -1 +1 @@\u001b[m\n\u001b[31m-Hello World\u001b[m\n\\ No newline at end of file\u001b[m\n\u001b[32m+\u001b[m\u001b[32mHello to the new c0d3 CLI\u001b[m\n',
            viewCount: 0,
            comment: null,
            order: null,
            challengeId: '143',
            lessonId: '2',
            reviewer: null,
            createdAt: '1589247516191',
            updatedAt: '1589316605068',
            __typename: 'Submission'
          }
        ]
      },
      alerts: [
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
    }
  })
  test('Should render lesson page for students', async () => {
    useRouter.mockReturnValue({
      query: {
        lesson: '5'
      }
    })
    const { container } = render(<Lesson />)
    expect(container).toMatchSnapshot()
  })
})
