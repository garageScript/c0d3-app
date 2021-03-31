import React from 'react'
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved
} from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import MyApp from '../../pages/_app'
import Login from '../../pages/login'
import * as Sentry from '@sentry/browser'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
import posthog from 'posthog-js'

jest.mock('posthog-js')
jest.spyOn(Sentry, 'captureException')

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

describe('MyApp component', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...OLD_ENV }
  })
  afterEach(() => {
    process.env = OLD_ENV
  })

  test('posthog init function should not be called if not in production environment', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} />
      </MockedProvider>
    )
    expect(posthog.init).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    )
  })

  test('posthog init function is being called with the correct arguments', async () => {
    process.env = {
      ...process.env,
      NODE_ENV: 'production',
      POSTHOG_API_KEY: 'fake-posthog-api-key'
    }
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} />
      </MockedProvider>
    )
    expect(posthog.init).toHaveBeenCalledWith(process.env.POSTHOG_API_KEY, {
      api_host: 'https://app.posthog.com'
    })
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    )
  })

  test('should render Login component passed in as prop', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    expect(Sentry.captureException).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    )
  })
})
