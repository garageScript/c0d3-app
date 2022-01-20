jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  ApolloClient: jest.fn().mockImplementation(() => ({
    extract: () => ({ foo: ['foo', 'bar', 'babaz'] }),
    cache: { restore: jest.fn() }
  }))
}))
describe('apolloClient', () => {
  global.fetch = jest.fn()
  const window = global.window
  const apollo = require('./apolloClient-server')
  beforeEach(() => {
    global.window = window
  })
  test('should use Schema link on server', () => {
    const mockSchema = jest.fn()
    jest.mock('@apollo/client/link/schema', () => ({
      SchemaLink: mockSchema
    }))
    jest.resetModules()
    delete global.window
    const apollo = require('./apolloClient-server')
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
})
