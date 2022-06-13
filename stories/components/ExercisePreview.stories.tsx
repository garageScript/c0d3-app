import * as React from 'react'
import ExercisePreview from '../../components/ExercisePreview'

export default {
  component: ExercisePreview,
  title: 'Components/ExercisePreview'
}

const exerciseData = {
  exercise: {
    question: `a = 1;
b = 2;
a = b;
// What is a?`,
    options: ['1', '2', 'b']
  }
}

export const Basic: React.FC = () => {
  return <ExercisePreview exercise={exerciseData.exercise} />
}
