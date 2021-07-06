import sentryInitializer from './sentryInitializer'

import * as Sentry from '@sentry/nextjs'
jest.mock('@sentry/nextjs')

describe('Ensure Sentry is initialized', () => {
  it('calls Sentry.init if no client is found', () => {
    Sentry.getCurrentHub.mockReturnValue({
      getClient: jest.fn().mockReturnValue(undefined)
    })
    sentryInitializer()

    expect(Sentry.init).toHaveBeenCalled()
  })
  it("doesn't calls Sentry.init if client is found", () => {
    Sentry.getCurrentHub.mockReturnValue({
      getClient: jest.fn().mockReturnValue({})
    })
    sentryInitializer()

    expect(Sentry.init).not.toHaveBeenCalled()
  })
})
