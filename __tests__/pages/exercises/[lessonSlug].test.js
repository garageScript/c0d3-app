import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Exercises from '../../../pages/exercises/[lessonSlug]'
import { useRouter } from 'next/router'
import { MockedProvider } from '@apollo/client/testing'
import getExercisesData from '../../../__dummy__/getExercisesData'
import GET_EXERCISES from '../../../graphql/queries/getExercises'

describe('Exercises page', () => {
  const { query } = useRouter()
  query['lessonSlug'] = 'js0'

  test('Should render correctly', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    screen.getByRole('link', { name: 'CHALLENGES' })
    screen.getByRole('link', { name: 'EXERCISES' })
    screen.getByRole('link', { name: 'LESSONS' })
  })

  test('Renders exercise card with the skip, previous, and exit buttons', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      }
    ]

    const { getByRole, queryByRole, getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() =>
      getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    const solveExercisesButton = getByRole('button', {
      name: 'SOLVE EXERCISES'
    })
    fireEvent.click(solveExercisesButton)

    // Previous button is not in the document on the first exercise.
    expect(queryByRole('button', { name: 'PREVIOUS' })).not.toBeInTheDocument()

    const skipButton = getByRole('button', { name: 'SKIP' })
    fireEvent.click(skipButton)
    expect(queryByRole('button', { name: 'PREVIOUS' })).toBeInTheDocument()

    // Expect "NEXT QUESTION" button to appear once you answered a question correctly.
    const inputBox = getByLabelText('User answer')
    fireEvent.change(inputBox, {
      target: { value: '3' }
    })
    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)
    const nextQuestionButton = getByRole('button', { name: 'NEXT QUESTION' })
    fireEvent.click(nextQuestionButton)

    // Skip button should not be in the document because we're on the last exercise now.
    expect(queryByRole('button', { name: 'SKIP' })).not.toBeInTheDocument()

    const previousButton = getByRole('button', { name: 'PREVIOUS' })
    fireEvent.click(previousButton)
    expect(queryByRole('button', { name: 'SKIP' })).toBeInTheDocument()

    const exitButton = getByRole('button', { name: 'Exit' })
    fireEvent.click(exitButton)
    expect(queryByRole('button', { name: 'PREVIOUS' })).not.toBeInTheDocument()
    expect(queryByRole('button', { name: 'SKIP' })).not.toBeInTheDocument()
  })

  test('Should not render lessons nav card tab if lesson docUrl is null', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: getExercisesData.lessons.map(lesson => ({
              ...lesson,
              docUrl: null
            }))
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() =>
      screen.getByRole('heading', { name: /Foundations of JavaScript/i })
    )

    screen.getByRole('link', { name: 'CHALLENGES' })
    screen.getByRole('link', { name: 'EXERCISES' })
    expect(screen.queryByRole('link', { name: 'LESSONS' })).toBeNull()
  })

  test('Should render a 500 error page if the lesson data is null', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: null
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByRole('heading', { name: /500 Error/i }))
  })

  test('Should render a 404 error page if the lesson is not found', async () => {
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: {
            ...getExercisesData,
            lessons: []
          }
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByRole('heading', { name: /404 Error/i }))
  })

  test('Should render a loading spinner if useRouter is not ready', async () => {
    useRouter.mockImplementation(() => ({
      isReady: false
    }))
    const mocks = [
      {
        request: { query: GET_EXERCISES },
        result: {
          data: getExercisesData
        }
      }
    ]

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Exercises />
      </MockedProvider>
    )

    await waitFor(() => screen.getByText('Loading...'))
  })
})
