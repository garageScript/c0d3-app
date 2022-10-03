import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import AdminLessonInputs from '../../components/admin/lessons/AdminLessonInputs'
import { Item } from '../../components/admin/lessons/AdminLessonInputs/AdminLessonInputs'
import { AddModuleDocument, UpdateModuleDocument } from '../../graphql'

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

const moduleWithId = {
  name: 'Functions',
  content: 'Functions are cool',
  order: 1,
  id: 1
}

const basicUpdateModuleMock = {
  request: {
    query: UpdateModuleDocument,
    variables: {
      ...moduleWithId,
      lessonId: 1
    }
  },
  result: {
    data: {
      updateModule: {
        ...moduleWithId,
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  }
}

export const Basic = () => {
  const someFn = (_: any) => ({
    data: {
      updateModule: {
        name: 'Cool item'
      }
    } as any,
    loading: false,
    error: false
  })

  const { loading } = someFn(null)

  const mutationFn = async (options: { variables: Item }) => {
    const { data } = await someFn({
      variables: {
        ...options.variables,
        lessonId: 1,
        id: 1
      }
    })

    return data?.updateModule
  }

  return (
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
                  ...modules[0],
                  lesson: {
                    title: 'Foundations of JavaScript'
                  }
                }
              }
            }
          },
          basicUpdateModuleMock
        ]}
      >
        <AdminLessonInputs
          item={modules[0]}
          lessonId={lesson.id}
          title={lesson.title}
          refetch={(() => {}) as any}
          action={mutationFn}
          loading={loading}
          itemName="module"
        />
      </MockedProvider>
    </>
  )
}
