import runMiddlewares from './runMiddlewares'

describe('runMiddlewares function', () => {
  it('should not run if passed in an empty middlewares array', async () => {
    const response = await runMiddlewares([], {}, {}, () => {})
    expect(response).toEqual(undefined)
  })
})
