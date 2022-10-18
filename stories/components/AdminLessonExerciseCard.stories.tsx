import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import ExerciseCard from '../../components/admin/lessons/AdminLessonExerciseCard'

export default {
  component: ExerciseCard,
  title: 'Components/AdminLessonExerciseCard'
}

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
  flagReason: 'setTimeout takes a callback function and not a number',
  module: {
    name: 'Variables'
  },
  flaggedAt: new Date()
}

export const Basic = () => (
  <MockedProvider>
    <ExerciseCard user={user as any} exercise={exercise as any} />
  </MockedProvider>
)

export const BasicWithManyItems = () => (
  <MockedProvider>
    <MockedProvider>
      <div
        style={{
          display: 'grid',
          gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'
        }}
      >
        <ExerciseCard
          user={user as any}
          exercise={
            {
              ...exercise,
              description: 'Potato in the oven',
              answer: '20',
              explanation: 'hard to know'
            } as any
          }
        />
        <ExerciseCard user={user as any} exercise={exercise as any} />
        <ExerciseCard
          user={user as any}
          exercise={
            {
              ...exercise,
              description: 'Potato in the oven',
              answer: '20',
              explanation: 'hard to know'
            } as any
          }
        />
        <ExerciseCard user={user as any} exercise={exercise as any} />
      </div>
    </MockedProvider>
  </MockedProvider>
)
