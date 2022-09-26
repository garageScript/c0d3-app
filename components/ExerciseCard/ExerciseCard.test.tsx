import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ExerciseCard from './ExerciseCard'

const successMessage = '🎉 Your answer is correct!'
const errorMessage = 'Your answer is incorrect - please try again.'

const exampleProblem = `let a = 5
a = a + 10
// what is a?`
const exampleAnswer = '15'
const exampleExplanation = `You can reassign variables that are initialized with "let".`

describe('ExerciseCard component', () => {
  it('Should render an exercise card', async () => {
    const setAnswerShown = jest.fn()
    const setMessageKey = jest.fn()

    const { getByRole, queryByText } = render(
      <ExerciseCard
        problem={exampleProblem}
        answer={exampleAnswer}
        explanation={exampleExplanation}
        answerShown={false}
        setAnswerShown={setAnswerShown}
        messageKey={'EMPTY'}
        setMessageKey={setMessageKey}
      />
    )

    // Test that an error message shows if the user is wrong

    expect(queryByText(errorMessage)).not.toBeInTheDocument()

    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)

    expect(setAnswerShown.mock.calls).toEqual([])
    expect(setMessageKey.mock.calls).toEqual([['ERROR']])
  })

  it('Should render an error message', () => {
    const setAnswerShown = jest.fn()
    const setMessageKey = jest.fn()

    const { getByRole, queryByText, getByLabelText } = render(
      <ExerciseCard
        problem={exampleProblem}
        answer={exampleAnswer}
        explanation={exampleExplanation}
        answerShown={false}
        setAnswerShown={setAnswerShown}
        messageKey={'ERROR'}
        setMessageKey={setMessageKey}
      />
    )

    expect(queryByText(errorMessage)).toBeInTheDocument()

    expect(queryByText(successMessage)).not.toBeInTheDocument()

    const inputBox = getByLabelText('User answer')
    fireEvent.change(inputBox, {
      target: { value: '15' }
    })

    // Test that the submit button shows the success message and the answer explanation

    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)

    expect(setAnswerShown.mock.calls).toEqual([[true]])
    expect(setMessageKey.mock.calls).toEqual([['SUCCESS']])
  })

  it('Should render a success message', () => {
    const setAnswerShown = jest.fn()
    const setMessageKey = jest.fn()

    const { getByRole, queryByText } = render(
      <ExerciseCard
        problem={exampleProblem}
        answer={exampleAnswer}
        explanation={exampleExplanation}
        answerShown={true}
        setAnswerShown={setAnswerShown}
        messageKey={'SUCCESS'}
        setMessageKey={setMessageKey}
      />
    )

    expect(queryByText(successMessage)).toBeInTheDocument()
    expect(queryByText(exampleExplanation)).toBeInTheDocument()

    // Test that the hide button hides the answer explanation

    const hideButton = getByRole('button', { name: 'Hide Answer' })
    fireEvent.click(hideButton)

    expect(setAnswerShown.mock.calls).toEqual([[false]])
    expect(setMessageKey.mock.calls).toEqual([])
  })

  it('Should hide the answer', () => {
    const setAnswerShown = jest.fn()
    const setMessageKey = jest.fn()

    const { queryByText, getByRole } = render(
      <ExerciseCard
        problem={exampleProblem}
        answer={exampleAnswer}
        explanation={exampleExplanation}
        answerShown={false}
        setAnswerShown={setAnswerShown}
        messageKey={'SUCCESS'}
        setMessageKey={setMessageKey}
      />
    )

    expect(queryByText(successMessage)).toBeInTheDocument()
    expect(queryByText(exampleExplanation)).not.toBeInTheDocument()

    // Test that the show button shows the answer explanation

    const hideButton = getByRole('button', { name: 'Show Answer' })
    fireEvent.click(hideButton)

    expect(setAnswerShown.mock.calls).toEqual([[true]])
    expect(setMessageKey.mock.calls).toEqual([])
  })
})
