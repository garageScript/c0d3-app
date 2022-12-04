import React from 'react'
import Lessons from '../../../../pages/admin/lessons'
import { MockedProvider } from '@apollo/client/testing'
import { act, render, waitFor } from '@testing-library/react'
import dummyLessonData from '../../../../__dummy__/lessonData'
import dummySessionData from '../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../__dummy__/alertData'
import '@testing-library/jest-dom'
import GET_APP from '../../../../graphql/queries/getApp'
import GET_FLAGGED_EXERCISES from '../../../../graphql/queries/getFlaggedExercises'

const mockExercises = [
  {
    flaggedAt: '1651723200000',
    module: {
      lesson: {
        title: 'Arrays'
      }
    }
  },
  {
    flaggedAt: '1641099600000',
    module: {
      lesson: {
        title: 'Arrays'
      }
    }
  },
  {
    flaggedAt: '1609563600000',
    module: {
      lesson: {
        title: 'Foundations of JavaScript'
      }
    }
  },
  {
    flaggedAt: null,
    module: {
      lesson: {
        title: 'Arrays'
      }
    }
  },
  {
    flaggedAt: '1357189200000',
    module: {
      lesson: {
        title: 'Foundations of JavaScript'
      }
    }
  },
  {
    flaggedAt: '1462420800000',
    module: {
      lesson: {
        title: 'Foundations of JavaScript'
      }
    }
  },
  {
    flaggedAt: null,
    module: {
      lesson: {
        title: 'Foundations of JavaScript'
      }
    }
  }
]

const mocks = {
  lessonsLoaded: [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: dummyLessonData,
          alerts: dummyAlertData
        }
      }
    },
    {
      request: { query: GET_FLAGGED_EXERCISES },
      result: {
        data: {
          exercises: mockExercises
        }
      }
    }
  ],
  lessonsNotLoaded: [
    {
      request: { query: GET_APP },
      result: {
        data: {
          session: dummySessionData,
          lessons: undefined,
          alerts: dummyAlertData
        }
      }
    },
    {
      request: { query: GET_FLAGGED_EXERCISES },
      result: {
        data: {
          exercises: mockExercises
        }
      }
    }
  ]
}

describe('new admin lessons page tests', () => {
  test('should render adminLessonCard components and show number of pending questions', async () => {
    expect.assertions(4)

    const { container, getByText, getAllByText } = render(
      <MockedProvider mocks={mocks.lessonsLoaded} addTypename={false}>
        <Lessons />
      </MockedProvider>
    )

    // Used to wait for the query response to arrive
    await act(async () => await new Promise(res => setTimeout(res, 0)))

    await waitFor(() => expect(getByText('3 Pending Questions')).toBeTruthy())
    expect(() => getByText('2 Pending Questions')).toBeTruthy()
    expect(() => getAllByText('0 Pending Questions')).toBeTruthy()
    expect(() => getByText('Arrays')).toBeTruthy()
  })

  test('should not render any components if lessons data does not load', async () => {
    expect.assertions(2)

    const { container, getByText, getAllByText } = render(
      <MockedProvider mocks={mocks.lessonsNotLoaded}>
        <Lessons />
      </MockedProvider>
    )

    await act(async () => await new Promise(res => setTimeout(res, 0)))

    expect(() => getAllByText('0 Pending Questions')).toThrow()
    expect(() => getByText('Arrays')).toThrow()
  })
})
