import React, { useState } from 'react'
import ExerciseCard, { Message } from '../../components/ExerciseCard'

export default {
  component: ExerciseCard,
  title: 'Components/ExerciseCard'
}

const exampleProblem = `let a = 5
a = a + 10
// what is a?`

const exampleAnswer = '15'

const exampleExplanation = `You can reassign variables that are initialized with "let".`

export const Basic = () => {
  const [answerShown, setAnswerShown] = useState(false)
  const [message, setMessage] = useState(Message.EMPTY)

  return (
    <ExerciseCard
      problem={exampleProblem}
      answer={exampleAnswer}
      explanation={exampleExplanation}
      answerShown={answerShown}
      setAnswerShown={setAnswerShown}
      message={message}
      setMessage={setMessage}
    />
  )
}
