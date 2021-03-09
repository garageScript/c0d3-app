import React from 'react'
import {
  render,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import MyApp from '../../pages/_app'
import Curriculum from '../../pages/curriculum'
import * as Sentry from '@sentry/browser'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'

const mocks = [
  {
    request: { query: GET_APP },
    result: {
      data: {
        session: dummySessionData,
        lessons: dummyLessonData,
        alerts: dummyAlertData
      }
    }
  }
]

jest.spyOn(Sentry, 'captureException')

describe('MyApp component', () => {
  test('should render Curriculum component passed in as prop', async () => {
    const { container, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Curriculum} />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await waitFor(() => expect(container).toMatchSnapshot())
    expect(Sentry.captureException).not.toHaveBeenCalled()
  })
})
