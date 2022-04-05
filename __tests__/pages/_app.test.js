import '../../__mocks__/next-auth/nextAuthAPI.mock'
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import MyApp from '../../pages/_app'
import Login from '../../pages/login'
import * as Sentry from '@sentry/browser'
import GET_APP from '../../graphql/queries/getApp'
import dummyLessonData from '../../__dummy__/lessonData'
import dummySessionData from '../../__dummy__/sessionData'
import dummyAlertData from '../../__dummy__/alertData'
import posthog from 'posthog-js'

jest.mock('next-auth/react')
import { SessionProvider } from 'next-auth/react'

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

SessionProvider.mockImplementation(({ children }) => <>{children}</>)

describe('MyApp component', () => {
  const OLD_ENV = process.env
  window.fetch = jest.fn()
  beforeEach(() => {
    jest.clearAllMocks()
    process.env = { ...OLD_ENV }
  })
  afterEach(() => {
    process.env = OLD_ENV
  })
  test('should call layout getter if present', async () => {
    const getLayout = jest.fn(page => <>{page}</>)
    const ComponentWithLayout = () => <></>
    ComponentWithLayout.getLayout = getLayout
    render(<MyApp Component={ComponentWithLayout} pageProps={{}} />)
    expect(getLayout).toHaveBeenCalled()
  })
  test('should render components without layout getter', async () => {
    const SimpleComponent = () => <h1>No Layout Here</h1>
    render(<MyApp Component={SimpleComponent} pageProps={{}} />)
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'No Layout Here' })
      ).toBeTruthy()
    )
  })
  test('posthog init function should not be called if not in production environment', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} pageProps={{}} />
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
      NEXT_PUBLIC_POSTHOG_API_KEY: 'fake-posthog-api-key'
    }
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} pageProps={{}} />
      </MockedProvider>
    )
    expect(posthog.init).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_POSTHOG_API_KEY,
      {
        api_host: 'https://app.posthog.com'
      }
    )
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    )
  })

  test('should render Login component passed in as prop', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MyApp Component={Login} pageProps={{}} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
    expect(Sentry.captureException).not.toHaveBeenCalled()
    await waitFor(() =>
      expect(screen.getByRole('heading', { name: /login/i })).toBeTruthy()
    )
  })
})
