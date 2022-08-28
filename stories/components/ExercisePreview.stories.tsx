import * as React from 'react'
import ExercisePreview from '../../components/ExercisePreview'

export default {
  component: ExercisePreview,
  title: 'Components/ExercisePreview'
}

const exerciseData = {
  description:
    'Description here \n\n ```jsx \na = 1; \nb = 2; \na = b; \n// What is a?\n```',
  answer: '1',
  explanation: '`a` is getting assigned `1`, so `a` is `1`'
}

export const Basic: React.FC = () => {
  return <ExercisePreview exercise={exerciseData} />
}
