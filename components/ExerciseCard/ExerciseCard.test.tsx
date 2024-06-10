import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ExerciseCard, { Message } from './ExerciseCard'
import { MockedProvider } from '@apollo/client/testing'

const exampleProblem = `let a = 5
a = a + 10
// what is a?`
const exampleAnswer = '15'
const exampleExplanation = `You can reassign variables that are initialized with "let".`

describe('ExerciseCard component', () => {
  it('Should render an exercise card', async () => {
    const setAnswerShown = jest.fn()
    const setMessage = jest.fn()
    const submitUserAnswer = jest.fn()

    const { getByRole, queryByText } = render(
      <MockedProvider>
        <ExerciseCard
          problem={exampleProblem}
          answer={exampleAnswer}
          explanation={exampleExplanation}
          answerShown={false}
          setAnswerShown={setAnswerShown}
          message={Message.EMPTY}
          setMessage={setMessage}
          submitUserAnswer={submitUserAnswer}
          exerciseId={1}
          flaggedAt={!!''}
        />
      </MockedProvider>
    )

    // Test that an error message shows if the user is wrong

    expect(queryByText(Message.ERROR)).not.toBeInTheDocument()

    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)

    expect(setAnswerShown).toBeCalledTimes(0)
    expect(setMessage).toBeCalledWith(Message.ERROR)
    expect(setMessage).toBeCalledTimes(1)
    expect(submitUserAnswer).toBeCalledWith('')
    expect(submitUserAnswer).toBeCalledTimes(1)
  })

  it('Should render an error message', () => {
    const setAnswerShown = jest.fn()
    const setMessage = jest.fn()
    const submitUserAnswer = jest.fn()

    const { getByRole, queryByText, getByLabelText } = render(
      <MockedProvider>
        <ExerciseCard
          problem={exampleProblem}
          answer={exampleAnswer}
          explanation={exampleExplanation}
          answerShown={false}
          setAnswerShown={setAnswerShown}
          message={Message.ERROR}
          setMessage={setMessage}
          exerciseId={1}
          submitUserAnswer={submitUserAnswer}
          flaggedAt={!!''}
        />
      </MockedProvider>
    )

    expect(queryByText(Message.ERROR)).toBeInTheDocument()
    expect(queryByText(Message.SUCCESS)).not.toBeInTheDocument()

    const inputBox = getByLabelText('User answer')
    fireEvent.change(inputBox, {
      target: { value: '15' }
    })

    // Test that the submit button shows the success message and the answer explanation

    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)

    expect(setAnswerShown).toBeCalledWith(true)
    expect(setAnswerShown).toBeCalledTimes(1)
    expect(setMessage).toBeCalledWith(Message.SUCCESS)
    expect(setMessage).toBeCalledTimes(1)
    expect(submitUserAnswer).toBeCalledWith('15')
    expect(submitUserAnswer).toBeCalledTimes(1)
  })

  it('Should render a success message', () => {
    const setAnswerShown = jest.fn()
    const setMessage = jest.fn()
    const submitUserAnswer = jest.fn()

    const { getByRole, queryByText } = render(
      <MockedProvider>
        <ExerciseCard
          problem={exampleProblem}
          exerciseId={1}
          answer={exampleAnswer}
          explanation={exampleExplanation}
          answerShown={true}
          setAnswerShown={setAnswerShown}
          message={Message.SUCCESS}
          setMessage={setMessage}
          submitUserAnswer={submitUserAnswer}
          flaggedAt={!!''}
        />
      </MockedProvider>
    )

    expect(queryByText(Message.SUCCESS)).toBeInTheDocument()
    expect(queryByText(exampleExplanation)).toBeInTheDocument()

    // Test that the hide button hides the answer explanation

    const hideButton = getByRole('button', { name: 'Hide Answer' })
    fireEvent.click(hideButton)

    expect(setAnswerShown).toBeCalledWith(false)
    expect(setAnswerShown).toBeCalledTimes(1)
    expect(setMessage).toBeCalledTimes(0)
    expect(submitUserAnswer).toBeCalledTimes(0)
  })

  it('Should hide the answer', () => {
    const setAnswerShown = jest.fn()
    const setMessage = jest.fn()
    const submitUserAnswer = jest.fn()

    const { queryByText, getByRole } = render(
      <MockedProvider>
        <ExerciseCard
          problem={exampleProblem}
          answer={exampleAnswer}
          explanation={exampleExplanation}
          exerciseId={1}
          answerShown={false}
          setAnswerShown={setAnswerShown}
          message={Message.SUCCESS}
          setMessage={setMessage}
          submitUserAnswer={submitUserAnswer}
          flaggedAt={!!''}
        />
      </MockedProvider>
    )

    expect(queryByText(Message.SUCCESS)).toBeInTheDocument()
    expect(queryByText(exampleExplanation)).not.toBeInTheDocument()

    // Test that the show button shows the answer explanation

    const hideButton = getByRole('button', { name: 'Show Answer' })
    fireEvent.click(hideButton)

    expect(setAnswerShown).toBeCalledWith(true)
    expect(setAnswerShown).toBeCalledTimes(1)
    expect(setMessage).toBeCalledTimes(0)
    expect(submitUserAnswer).toBeCalledTimes(0)
  })
})
