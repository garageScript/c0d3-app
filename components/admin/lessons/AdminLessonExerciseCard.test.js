import React from 'react'
import Component from './AdminLessonExerciseCard'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import REMOVE_EXERCISE from '../../../graphql/queries/removeExercise'
import REMOVE_EXERCISE_FLAG from '../../../graphql/queries/removeExerciseFlag'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const user = {
  username: 'noob',
  discordUsername: 'noob#123',
  email: 'noob@c0d3.com'
}

const exercise = {
  id: 1,
  description:
    'It’s all about context. The reason you get the above error is because, when you invoke setTimeout(), you are actually invoking window.setTimeout(). As a result, the anonymous function being passed to setTimeout()',
  answer: 'The right answer is setTimeout',
  explanation: "It's setTimeout because it's an async function and not sync",
  flagReason: 'setTimeout takes a callback function and not a number',
  module: {
    name: 'Variables',
    moduleId: 1
  }
}

const mocks = [
  {
    request: {
      query: REMOVE_EXERCISE,
      variables: { id: 1 }
    },
    result: {
      data: {
        removeExercise: {
          id: 1
        }
      }
    }
  },
  {
    request: {
      query: REMOVE_EXERCISE_FLAG,
      variables: {
        id: 1
      }
    },
    result: {
      data: {
        removeExerciseFlag: {
          id: 1
        }
      }
    }
  }
]

const loadingMocks = [
  {
    request: {
      query: REMOVE_EXERCISE,
      variables: { id: 1 }
    },
    result: {
      data: {
        removeExercise: {
          id: 1
        }
      }
    },
    // Keep the query at loading state for ~3170 years
    delay: 100_000_000_000_000
  }
]

describe('AdminLessonExerciseCard component', () => {
  it('Should show explanation on click', async () => {
    expect.assertions(1)

    render(
      <MockedProvider>
        <Component user={user} exercise={exercise} />
      </MockedProvider>
    )

    const btn = screen.getByText('Show explanation')
    await userEvent.click(btn)

    expect(screen.getByText('Hide explanation')).toBeInTheDocument()
  })

  it('Should remove exercise', async () => {
    expect.assertions(1)

    const onRemoveMock = jest.fn()

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} onRemove={onRemoveMock} />
      </MockedProvider>
    )

    const btn = screen.getByText('REMOVE EXERCISE')
    await userEvent.click(btn)

    expect(onRemoveMock).toBeCalled()
  })

  it('Should not call onRemove if deleted exercise Id is null', async () => {
    expect.assertions(1)

    const onRemoveMock = jest.fn()

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: REMOVE_EXERCISE,
              variables: { id: 1 }
            },
            result: {
              data: {
                removeExercise: {
                  id: null
                }
              }
            }
          }
        ]}
      >
        <Component user={user} exercise={exercise} onRemove={onRemoveMock} />
      </MockedProvider>
    )

    const btn = screen.getByText('REMOVE EXERCISE')
    await userEvent.click(btn)

    expect(onRemoveMock).not.toBeCalled()
  })

  it('Should not call onRemove if not passed', async () => {
    expect.assertions(1)

    const onRemoveMock = jest.fn()

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} />
      </MockedProvider>
    )

    const btn = screen.getByText('REMOVE EXERCISE')
    await userEvent.click(btn)

    expect(onRemoveMock).not.toBeCalled()
  })

  it('Should unflag exercise', async () => {
    expect.assertions(1)

    const onUnflag = jest.fn()

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} onUnflag={onUnflag} />
      </MockedProvider>
    )

    const btn = screen.getByText('UNFLAG EXERCISE')
    await userEvent.click(btn)

    expect(onUnflag).toBeCalled()
  })

  it('Should not call onUnflag if exercise Id is null', async () => {
    expect.assertions(1)

    const onUnflag = jest.fn()

    render(
      <MockedProvider
        mocks={[
          {
            request: {
              query: REMOVE_EXERCISE_FLAG,
              variables: {
                id: 1
              }
            },
            result: {
              data: {
                removeExerciseFlag: {
                  id: null
                }
              }
            }
          }
        ]}
      >
        <Component user={user} exercise={exercise} onUnflag={onUnflag} />
      </MockedProvider>
    )

    const btn = screen.getByText('UNFLAG EXERCISE')
    await userEvent.click(btn)

    expect(onUnflag).not.toBeCalled()
  })

  it('Should not call unflag if not passed', async () => {
    expect.assertions(1)

    const onUnflag = jest.fn()

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} />
      </MockedProvider>
    )

    const btn = screen.getByText('UNFLAG EXERCISE')
    await userEvent.click(btn)

    expect(onUnflag).not.toBeCalled()
  })

  it('Should show loading spinner', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={loadingMocks}>
        <Component user={user} exercise={exercise} onRemove={() => {}} />
      </MockedProvider>
    )

    const btn = screen.getByText('REMOVE EXERCISE')
    await userEvent.click(btn)

    expect(screen.queryByText('REMOVE EXERCISE')).not.toBeInTheDocument()
  })

  it('Should not show the explanation if not provided', () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={{ ...exercise, explanation: '' }} />
      </MockedProvider>
    )

    expect(screen.queryByText('Show explanation')).not.toBeInTheDocument()
  })
})
