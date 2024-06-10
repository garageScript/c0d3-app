import { MockedProvider } from '@apollo/client/testing'
import React from 'react'
import ExerciseReportCard from '../../components/ExerciseReportCard'
import FLAG_EXERCISE from '../../graphql/queries/flagExercise'

export default {
  component: ExerciseReportCard,
  title: 'Components/ExerciseReportCard'
}

export const Basic = () => {
  return (
    <div>
      <p>
        Leave the description empty and try to submit to display success message
      </p>
      <MockedProvider
        mocks={[
          {
            request: {
              query: FLAG_EXERCISE,
              variables: {
                id: 1,
                flagReason: ''
              }
            },
            result: {
              data: {
                flagExercise: {
                  id: 1
                }
              }
            }
          }
        ]}
      >
        <ExerciseReportCard exerciseId={1} flaggedAt={!!''} />
      </MockedProvider>
    </div>
  )
}

export const FlaggedExercise = () => {
  return (
    <div>
      <MockedProvider
        mocks={[
          {
            request: {
              query: FLAG_EXERCISE,
              variables: {
                id: 1,
                flagReason: ''
              }
            },
            result: {
              data: {
                flagExercise: {
                  id: 1
                }
              }
            }
          }
        ]}
      >
        <ExerciseReportCard exerciseId={1} flaggedAt={!!'today'} />
      </MockedProvider>
    </div>
  )
}
