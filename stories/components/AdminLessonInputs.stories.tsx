import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import AdminLessonInputs from '../../components/admin/lessons/AdminLessonInputs'
import { AddModuleDocument } from '../../graphql'
import '../../__mocks__/matchMedia.mock'

export default {
  component: AdminLessonInputs,
  title: 'Components/AdminLessonInputs'
}

const lesson = { title: 'Foundations of JavaScript', id: 1 }
const modules = [
  {
    name: 'Functions',
    content: 'Functions are cool'
  }
]

export const Basic = () => (
  <>
    <div>
      <ol>
        <li>Submit with empty values for error</li>
        <li>
          <code>name: {modules[0].name}</code> /{' '}
          <code>description: {modules[0].content}</code> for success message
        </li>
      </ol>
    </div>
    <MockedProvider
      mocks={[
        {
          request: {
            query: AddModuleDocument,
            variables: {
              ...modules[0],
              lessonId: 1
            }
          },
          result: {
            data: {
              addModule: {
                id: 1,
                ...modules[0],
                lesson: {
                  title: 'Foundations of JavaScript'
                }
              }
            }
          }
        }
      ]}
    >
      <AdminLessonInputs lessonId={lesson.id} title={lesson.title} />
    </MockedProvider>
  </>
)
