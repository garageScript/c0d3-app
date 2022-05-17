import { ApolloQueryResult, OperationVariables } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import AdminModuleInputs from '../../components/admin/lessons/AdminModuleInputs'
import { AddModuleDocument, Module } from '../../graphql'

export default {
  component: AdminModuleInputs,
  title: 'Components/AdminModuleInputs'
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
      <AdminModuleInputs
        lessonId={lesson.id}
        title={lesson.title}
        refetch={
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
