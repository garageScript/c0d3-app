import '@testing-library/jest-dom'
import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import ExerciseCard from './ExerciseCard'

describe('ExerciseCard component', () => {
  it('Should render an exercise card', () => {
    const exampleProblem = `let a = 5
a = a + 10
// what is a?`
    const exampleAnswer = '15'
    const exampleExplanation = `You can reassign variables that are initialized with "let".`

    const { getByRole, queryByText, getByLabelText } = render(
      <ExerciseCard
        problem={exampleProblem}
        answer={exampleAnswer}
        explanation={exampleExplanation}
      />
    )

    // Test that an error message shows if the user is wrong

    const errorMessage = 'Your answer is incorrect - please try again.'

    expect(queryByText(errorMessage)).not.toBeInTheDocument()

    const submitButton = getByRole('button', { name: 'SUBMIT' })
    fireEvent.click(submitButton)

    expect(queryByText(errorMessage)).toBeInTheDocument()

    // Test that a success message shows and the answer is shown if the user is right

    const successMessage = '🎉 Your answer is correct!'

    expect(queryByText(successMessage)).not.toBeInTheDocument()

    const inputBox = getByLabelText('User answer')
    fireEvent.change(inputBox, {
      target: { value: '15' }
    })
    fireEvent.click(submitButton)

    expect(queryByText(successMessage)).toBeInTheDocument()
    expect(queryByText(exampleExplanation)).toBeInTheDocument()

    // Test that the hide button hides the answer explanation

    const hideButton = getByRole('button', { name: 'Hide Answer' })
    fireEvent.click(hideButton)

    expect(queryByText(exampleExplanation)).not.toBeInTheDocument()
  })
})
