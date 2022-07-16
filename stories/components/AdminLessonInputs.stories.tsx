import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import AdminLessonInputs from '../../components/admin/lessons/AdminLessonInputs'
import { AddModuleDocument, Module, UpdateModuleDocument } from '../../graphql'

export default {
  component: AdminLessonInputs,
  title: 'Components/AdminLessonInputs'
}

const lesson = { title: 'Foundations of JavaScript', id: 1 }
const modules = [
  {
    name: 'Functions',
    content: 'Functions are cool',
    order: 1,
    id: 1
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
            query: UpdateModuleDocument,
            variables: {
              ...modules[0],
              lessonId: 1
            }
          },
          result: {
            data: {
              updateModule: {
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
      <AdminLessonInputs
        module={modules[0]}
        lessonId={lesson.id}
        title={lesson.title}
        refetchModules={
          (() => {}) as (variables?: Partial<OperationVariables>) => Promise<
            ApolloQueryResult<{
              modules: Module[]
            }>
          >
        }
      />
    </MockedProvider>
  </>
)
