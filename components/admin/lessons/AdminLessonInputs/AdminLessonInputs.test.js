import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminModuleInputs from './AdminLessonInputs'
import { MockedProvider } from '@apollo/client/testing'
import {
  AddModuleDocument,
  CreateChallengeDocument,
  UpdateChallengeDocument,
  UpdateModuleDocument
} from '../../../../graphql'
import '../../../../__mocks__/matchMedia.mock'

// Imported to be able to use .toBeInTheDocument()
import '@testing-library/jest-dom'

const lesson = { title: 'Foundations of JavaScript', id: 1 }
const modules = {
  basic: {
    name: 'Functions',
    content: 'Functions are cool',
    order: 1
  },
  withId: {
    name: 'Functions',
    content: 'Functions are cool',
    order: 1,
    id: 1
  }
}

const basicAddModuleMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules.basic,
      lessonId: 1
    }
  },
  result: {
    data: {
      addModule: {
        id: 1,
        ...modules.basic,
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  }
}

const basicUpdateModuleMock = {
  request: {
    query: UpdateModuleDocument,
    variables: {
      ...modules.withId,
      lessonId: 1
    }
  },
  result: {
    data: {
      updateModule: {
        id: 1,
        ...modules.withId,
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  }
}

const moduleErrorMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules.basic,
      lessonId: 1
    }
  },
  error: new Error('Error')
}

const moduleLoadingMock = {
  request: {
    query: AddModuleDocument,
    variables: {
      ...modules.basic,
      lessonId: 1
    }
  },
  result: {
    data: {
      addModule: {
        id: 1,
        ...modules.basic,
        lesson: {
          title: 'Foundations of JavaScript'
        }
      }
    }
  },
  // Keep the query at loading state for ~3170 years
  delay: 100_000_000_000_000
}

const challenges = {
  basic: {
    title: 'Function call',
    description: 'Functions are cool',
    order: 1
  },
  withId: {
    title: 'Function call',
    description: 'Functions are cool',
    order: 1,
    id: 1
  }
}

const basicAddChallengeMock = {
  request: {
    query: CreateChallengeDocument,
    variables: {
      ...challenges.basic,
      lessonId: 1
    }
  },
  result: {
    data: {
      createChallenge: {
        id: 1,
        ...challenges.basic
      }
    }
  }
}

const basicUpdateChallengeMock = {
  request: {
    query: UpdateChallengeDocument,
    variables: {
      ...challenges.withId,
      lessonId: 1
    }
  },
  result: {
    data: {
      updateChallenge: {
        id: 1,
        ...challenges.withId
      }
    }
  }
}

const challengeErrorMock = {
  request: {
    query: CreateChallengeDocument,
    variables: {
      ...challenges.basic,
      lessonId: 1
    }
  },
  error: new Error('Error')
}

const moduleMocks = [basicAddModuleMock]
const moduleUpdateModuleMocks = [basicUpdateModuleMock]
const moduleErrorMocks = [moduleErrorMock, { ...moduleErrorMock }]
const moduleLoadingMocks = [moduleLoadingMock]

const challengeMocks = [basicAddChallengeMock]
const challengeUpdateModuleMocks = [basicUpdateChallengeMock]
const challengeErrorMocks = [challengeErrorMock, { ...challengeErrorMock }]

describe('AdminModuleInputs component', () => {
  describe('Challenges', () => {
    it('Should add challenge', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={challengeMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchChallenges={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Function call', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD CHALLENGE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-check-circle')
        ).toBeInTheDocument()
      )
    })

    it('Should not refetch the challenges', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={challengeMocks}>
          <AdminModuleInputs lessonId={lesson.id} title={lesson.title} />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Function call', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD CHALLENGE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-check-circle')
        ).toBeInTheDocument()
      )
    })

    it('Should update challenge', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={challengeUpdateModuleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchChallenges={() => {}}
            challenge={challenges.withId}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Function call', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('SAVE CHANGES')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-check-circle')
        ).toBeInTheDocument()
      )
    })

    it('Should call onAddItem when a challenge is added', async () => {
      expect.hasAssertions()

      const onAddItem = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={challengeMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddItem}
            refetchChallenges={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Function call', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD CHALLENGE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(onAddItem).toBeCalledWith(
          {
            ...basicAddChallengeMock.result.data.createChallenge,
            lesson: { id: lesson.id }
          },
          null
        )
      )
    })

    it('Should call onAddModule when there is error', async () => {
      expect.hasAssertions()

      const onAddItem = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={challengeErrorMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddItem}
            refetchChallenges={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Function call', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })
      const submit = getByText('ADD CHALLENGE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(onAddItem).toBeCalledWith(null, {
          ...challenges.basic,
          id: -1,
          lessonId: lesson.id
        })
      )
    })
  })

  describe('Modules', () => {
    it('Should add module', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={moduleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-check-circle')
        ).toBeInTheDocument()
      )
    })

    it('Should update module', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={moduleUpdateModuleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
            module={modules.withId}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('SAVE CHANGES')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-check-circle')
        ).toBeInTheDocument()
      )
    })

    it('Should display error message if inputs are empty', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={moduleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.clear(getByTestId('input0'))
      await userEvent.clear(getByTestId('textbox'))

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-alert-fill')
        ).toBeInTheDocument()
      )
    })

    it('Should display error message if network or GraphQL error', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={moduleErrorMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          container.querySelector('.octicon-alert-fill')
        ).toBeInTheDocument()
      )
    })

    it('Should display loading message', async () => {
      expect.assertions(1)

      const { getByText, getByTestId, container } = render(
        <MockedProvider mocks={moduleLoadingMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      expect(container.querySelector('.spinner-grow')).toBeInTheDocument()
    })

    it('Should display "Untitled" if no title is provided', async () => {
      expect.assertions(1)

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={moduleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={''}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.clear(getByTestId('input0'))

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      expect(getByText('Untitled')).toBeInTheDocument()
    })

    it('Should call onAddItem when a module is added', async () => {
      expect.hasAssertions()

      const onAddModule = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={moduleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddModule}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(onAddModule).toBeCalledWith(
          {
            ...basicAddModuleMock.result.data.addModule,
            lesson: { id: lesson.id }
          },
          null
        )
      )
    })

    it('Should call onAddModule when a module is updated', async () => {
      expect.hasAssertions()

      const onAddItem = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={moduleUpdateModuleMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddItem}
            refetchModules={() => {}}
            module={modules.withId}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('SAVE CHANGES')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(onAddItem).toBeCalledWith(
          {
            ...basicUpdateModuleMock.result.data.updateModule,
            lesson: { id: lesson.id }
          },
          null
        )
      )
    })

    it('Should call onAddModule with null when a module is added', async () => {
      expect.hasAssertions()

      const onAddItem = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider
          mocks={[
            {
              ...basicAddModuleMock,
              result: {
                ...basicAddModuleMock.result,
                data: null
              }
            }
          ]}
        >
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddItem}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() => expect(onAddItem).toBeCalledWith(null, null))
    })

    it('Should call onAddModule when there is error', async () => {
      expect.hasAssertions()

      const onAddItem = jest.fn()

      const { getByText, getByTestId } = render(
        <MockedProvider mocks={moduleErrorMocks}>
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            onAddItem={onAddItem}
            refetchModules={() => {}}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })
      const submit = getByText('ADD MODULE')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(onAddItem).toBeCalledWith(null, { ...modules.basic, id: -1 })
      )
    })

    it('Should handle false module update/add query response name', async () => {
      expect.assertions(1)

      const { getByText, getByTestId } = render(
        <MockedProvider
          mocks={[
            {
              ...moduleUpdateModuleMocks[0],
              result: {
                data: {
                  updateModule: {
                    ...moduleUpdateModuleMocks[0].result.data.updateModule,
                    name: undefined
                  }
                }
              }
            }
          ]}
        >
          <AdminModuleInputs
            lessonId={lesson.id}
            title={lesson.title}
            refetchModules={() => {}}
            module={modules.withId}
          />
        </MockedProvider>
      )

      await userEvent.type(getByTestId('input0'), 'Functions', {
        delay: 1
      })
      await userEvent.type(getByTestId('input2'), '1', {
        delay: 1
      })
      await userEvent.type(getByTestId('textbox'), 'Functions are cool', {
        delay: 1
      })

      const submit = getByText('SAVE CHANGES')
      await userEvent.click(submit)

      await waitFor(() =>
        expect(
          getByText('Updated the module successfully!')
        ).toBeInTheDocument()
      )
    })
  })
})
