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

  test('should return new client', () => {
    expect(apollo.initializeApollo()).toBeTruthy()
  })
})
