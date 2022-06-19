import React from 'react'
import Component from './AdminLessonExerciseCard'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { gql } from '@apollo/client'

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
  flagReason: 'setTimeout takes a callback function and not a number'
}

const REMOVE_EXERCISE = gql`
  mutation deleteExercise($id: Int!) {
    deleteExercise(id: $id) {
      id
    }
  }
`

const mocks = [
  {
    request: {
      query: REMOVE_EXERCISE,
      variables: { id: 1 }
    },
    result: {
      data: {
        deleteExercise: {
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
        deleteExercise: {
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

    expect(screen.getByText('Hide explanation')).toBeTruthy()
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

  it('Should not call onRemove if not passed', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} />
      </MockedProvider>
    )

    const btn = screen.getByText('REMOVE EXERCISE')
    await userEvent.click(btn)
  })

  it('Should unflag exercise', async () => {
    // expect.assertions(1)

    const onUnflag = jest.fn()

    render(
      <MockedProvider mocks={mocks}>
        <Component user={user} exercise={exercise} onUnflag={onUnflag} />
      </MockedProvider>
    )

    const btn = screen.getByText('UNFLAG EXERCISE')
    await userEvent.click(btn)

    // expect(onUnflag).toBeCalled()
    // Will be uncommented when the unflag mutation is implemented
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

    expect(screen.queryByText('REMOVE EXERCISE')).toBeFalsy()
  })
})
