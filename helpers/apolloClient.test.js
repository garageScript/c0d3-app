const mockMemo = jest.fn(f => {
  f()
})

/*
mocking react hook because it's causing errors with resetModules
https://github.com/facebook/jest/issues/8987
*/
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useMemo: mockMemo
}))
const mockHTTP = jest.fn()
const mockSchema = jest.fn()
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  HttpLink: mockHTTP,
  ApolloClient: jest.fn().mockImplementation(() => ({
    extract: () => ({ foo: ['foo', 'bar', 'babaz'] }),
    cache: { restore: jest.fn() }
  }))
}))
jest.mock('@apollo/client/link/schema', () => ({
  SchemaLink: mockSchema
}))

describe('apolloClient', () => {
  global.fetch = jest.fn()
  const window = global.window
  const apollo = require('./apolloClient')
  test('should use Schema link on server', () => {
    jest.resetModules()
    delete global.window
    const apollo = require('./apolloClient')
    apollo.initializeApollo()
    expect(mockSchema).toBeCalled()
  })

  test('should use HTTP link in browser', () => {
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
