import { MockedProvider } from '@apollo/client/testing'
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
    <MockedProvider>
      <ExercisePreviewCard
        moduleName="Variables"
        state="ANSWERED"
        problem={exampleProblem}
        id={1}
      />
    </MockedProvider>
  )
}

export const NotAnswered = () => {
  return (
    <MockedProvider>
      <ExercisePreviewCard
        moduleName="Variables"
        state="NOT ANSWERED"
        problem={exampleProblem}
        id={1}
      />
    </MockedProvider>
  )
}
