/*
mocking useMemo hook because it's causing errors with resetModules
https://github.com/facebook/jest/issues/8987
*/

const mockMemo = jest.fn(f => {
  f()
})
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: mockMemo
}))
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  ApolloClient: jest.fn().mockImplementation(() => ({
    extract: () => ({ foo: ['foo', 'bar', 'babaz'] }),
    cache: { restore: jest.fn() }
  }))
}))
jest.mock('nodemailer')

describe('apolloClient', () => {
  global.fetch = jest.fn()
  const window = global.window
  const apollo = require('./apolloClient')
  beforeEach(() => {
    global.window = window
  })
  test('should catch error while restoring the cache', () => {
    jest.mock('apollo3-cache-persist', () => ({
      persistCache: jest.fn().mockRejectedValueOnce('fail')
    }))

    window.history.pushState({}, 'Page Title', '/curriculum')
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.resetModules()
    try {
      require('./apolloClient')
    } catch (e) {
      console.log(e)
      expect(e).toBeTruthy()
    }
  })
  test('should use Schema link on server', () => {
    const mockSchema = jest.fn()
    jest.mock('@apollo/client/link/schema', () => ({
      SchemaLink: mockSchema
    }))
    jest.resetModules()
    delete global.window
    const apollo = require('./apolloClient')
    apollo.initializeApollo()
    expect(mockSchema).toBeCalled()
  })

  test('should use HTTP link in browser', () => {
    const mockHTTP = jest.fn()
    jest.mock('@apollo/client/link/http', () => ({
      HttpLink: jest.fn().mockImplementation(mockHTTP)
    }))
    global.window = window
    apollo.initializeApollo()
    expect(mockHTTP).toBeCalled()
  })
  test('should merge caches and return new client', () => {
    expect(
      apollo.initializeApollo({
        foo: ['foo', 'bar'],
        bar: ['bar', 'baz', 'zaz']
      })
    ).toBeTruthy()
  })
  test('should return new client', () => {
    expect(apollo.initializeApollo()).toBeTruthy()
  })
  test('should add apollo state to props', () => {
    const props = apollo.addApolloState(
      { cache: { extract: jest.fn() } },
      { props: { foo: 'foo' } }
    )
    expect(
      Object.keys(props.props).includes(apollo.APOLLO_STATE_PROP_NAME)
    ).toBeTruthy()
  })
  test('should not add apollo state', () => {
    const emptyProps = {}
    const res = apollo.addApolloState({}, emptyProps)
    expect(res).toEqual(emptyProps)
  })
  test('should use memo', () => {
    apollo.useApollo({ __APOLLO_STATE__: ['foo'] })
    expect(mockMemo).toBeCalled()
  })
})
