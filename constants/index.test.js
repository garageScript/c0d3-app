describe('DEPLOYMENT_URL', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  it('should be formed from VERCEL_URL if it is set', () => {
    process.env.VERCEL_URL = 'www.c0d3.com'
    const { DEPLOYMENT_URL } = require('./index')

    expect(DEPLOYMENT_URL).toBe('https://www.c0d3.com')
  })

  it('should be localhost if VERCEL_URL is not set', () => {
    delete process.env.VERCEL_URL
    const { DEPLOYMENT_URL } = require('./index')

    expect(DEPLOYMENT_URL).toBe('http://localhost:3000')
  })
})
