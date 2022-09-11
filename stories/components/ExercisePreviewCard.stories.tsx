import React from 'react'
import ExercisePreviewCard from '../../components/ExercisePreviewCard'

export default {
  component: ExercisePreviewCard,
  title: 'Components/ExercisePreviewCard'
}

const exampleProblem = `const a = 5
a = a + 10
// what is a?`

export const Answered = () => {
  return (
    <ExercisePreviewCard
      topic="Variables"
      state="ANSWERED"
      problem={exampleProblem}
    />
  )
}

export const NotAnswered = () => {
  return (
    <ExercisePreviewCard
      topic="Variables"
      state="NOT ANSWERED"
      problem={exampleProblem}
    />
  )
}
