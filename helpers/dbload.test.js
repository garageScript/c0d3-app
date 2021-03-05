jest.mock('sequelize')
const defaultOptions = {
  host: process.env.DB_HOST || 'city',
  logging: false,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}
describe('dbload tests', () => {
  beforeEach(() => {
    jest.resetModuleRegistry()
  })
  it('should use default port if no port is provided in development', () => {
    process.env.NODE_ENV = 'development'
    const customOptions = { ...defaultOptions, port: 5432 }
    const { options } = require('./dbload')
    expect(options).toEqual(customOptions)
  })
  it('should use provided port in development', () => {
    process.env.DB_PORT = 9999
    const customOptions = { ...defaultOptions, port: '9999' }
    const { options } = require('./dbload')
    expect(options).toEqual(customOptions)
  })

  it('should default options in production', () => {
    process.env.NODE_ENV = 'production'
    const { options } = require('./dbload')
    expect(options).toEqual(defaultOptions)
  })
})
