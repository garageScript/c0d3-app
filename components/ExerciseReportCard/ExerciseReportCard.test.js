import React from 'react'
import ExerciseReportCard from './index'
import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import FLAG_EXERCISE from '../../graphql/queries/flagExercise'
import userEvent from '@testing-library/user-event'

// Imported to be able to use expect(...).toBeInTheDocument()
import '@testing-library/jest-dom'

const mocks = [
  {
    request: {
      query: FLAG_EXERCISE,
      variables: {
        id: 1,
        flagReason: 'Bad exercise'
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
]

const reportBtn = 'Report a problem'

describe('ExerciseReportCard Component', () => {
  it('Should submit an issue successfully', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <ExerciseReportCard exerciseId={1} flaggedAt={!!''} />
      </MockedProvider>
    )

    await userEvent.click(screen.getByText(reportBtn))

    await userEvent.type(screen.getByTestId('textbox'), 'Bad exercise')
    await userEvent.click(screen.getByText('Submit issue'))

    expect(
      await screen.findByText('Reported a mistake in this exercise')
    ).toBeInTheDocument()
  })

  it('Should display default message for an already flagged exercise', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <ExerciseReportCard
          exerciseId={1}
          flaggedAt={!!'11/04/2022 19:00:15'}
        />
      </MockedProvider>
    )

    await userEvent.click(screen.getByText(reportBtn))

    expect(
      await screen.findByText('The exercise has already been reported')
    ).toBeInTheDocument()
  })

  it('Should cancel the report', async () => {
    expect.assertions(1)

    render(
      <MockedProvider mocks={mocks}>
        <ExerciseReportCard exerciseId={1} flaggedAt={!!''} />
      </MockedProvider>
    )

    await userEvent.click(screen.getByText(reportBtn))
    await userEvent.click(screen.getByText('Cancel'))

    expect(await screen.findByText(reportBtn)).toBeInTheDocument()
  })
})
