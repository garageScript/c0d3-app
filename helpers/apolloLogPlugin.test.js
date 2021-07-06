/**
 * @jest-environment node
 */
import { apolloLogPlugin } from './apolloLogPlugin'
import { ApolloError } from 'apollo-server-micro'
import * as Sentry from '@sentry/nextjs'

jest.spyOn(Sentry, 'withScope').mockImplementation(fn => fn(fakeScope))
describe('apolloLogPlugin', () => {
  let fakeScope
  beforeAll(() => {
    fakeScope = {
      setTag: jest.fn(),
      setExtra: jest.fn(),
      addBreadcrumb: jest.fn(),
      setTransactionName: jest.fn()
    }

    jest.spyOn(Sentry, 'flush')
    jest.spyOn(Sentry, 'captureException')
    jest.spyOn(global.console, 'error').mockImplementation(() => {})
    jest.spyOn(Sentry, 'withScope').mockImplementation(fn => fn(fakeScope))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('calling requestDidStart method return object with didEncounterErrors method', () => {
    expect(apolloLogPlugin.requestDidStart()).toHaveProperty(
      'didEncounterErrors',
      expect.any(Function)
    )
  })

  it('should not call Sentry.withScope if operation is undefined', () => {
    const ctx = { errors: ['theError'] }

    apolloLogPlugin.requestDidStart().didEncounterErrors(ctx)

    expect(Sentry.withScope).not.toHaveBeenCalled()
  })

  it('should captureException and not call Sentry.withScope for ApolloErrors', () => {
    const apolloError = new ApolloError('hello')
    const ctx = {
      operation: 'query',
      errors: [apolloError]
    }

    apolloLogPlugin.requestDidStart().didEncounterErrors(ctx)
    expect(Sentry.withScope).not.toHaveBeenCalled()
    expect(Sentry.captureException).toHaveBeenCalledWith(apolloError)
  })

  it('should add context to all other Errors', async () => {
    const someError = new Error('other')

    const ctx = {
      operation: 'query',
      request: {},
      errors: [someError, { path: ['fake', 'path'] }]
    }

    apolloLogPlugin.requestDidStart().didEncounterErrors(ctx)

    expect(Sentry.withScope).toHaveBeenCalledTimes(2)
    expect(Sentry.captureException).toHaveBeenCalledTimes(2)
  })

  it('should add transaction name if x-transaction-id header  is set', async () => {
    const ctx = {
      operation: 'query',
      request: { http: { headers: { get: () => 'fakeId' } } },
      errors: [{}]
    }

    apolloLogPlugin.requestDidStart().didEncounterErrors(ctx)

    expect(Sentry.withScope).toHaveBeenCalled()
    expect(Sentry.captureException).toHaveBeenCalledWith(ctx.errors[0])
    expect(fakeScope.setTransactionName).toHaveBeenCalledWith('fakeId')
  })

  it('should call Sentry.flush ', () => {
    const ctx = {
      operation: 'query',
      request: {},
      errors: [{}]
    }

    apolloLogPlugin.requestDidStart().didEncounterErrors(ctx)
    expect(Sentry.flush).toHaveBeenCalled()
  })
})
