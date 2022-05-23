import '../../../../__mocks__/useIsMac.mock'
import '../../../../__mocks__/useBreakpoint.mock'
import React from 'react'
import Lessons from '../../../../pages/admin/lessons/index'
import dummyLessonData from '../../../../__dummy__/lessonData'
import dummySessionData from '../../../../__dummy__/sessionData'
import dummyAlertData from '../../../../__dummy__/alertData'
import { MockedProvider } from '@apollo/client/testing'
import {
  render,
  waitForElementToBeRemoved,
  fireEvent,
  waitFor
} from '@testing-library/react'
import '@testing-library/jest-dom'
import GET_APP from '../../../../graphql/queries/getApp'

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

describe('Users test', () => {
  test('should switch to selected lesson in AdminLessonsSidebar', async () => {
    const { container, getByText, queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Lessons />
      </MockedProvider>
    )
    await waitForElementToBeRemoved(() => queryByText('Loading...'))
    await waitFor(() => expect(container).toMatchSnapshot())
    const searchByName = getByText('Objects')
    fireEvent.click(searchByName)
    await waitFor(() => expect(container).toMatchSnapshot())
  })
})
