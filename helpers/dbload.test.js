jest.mock('sequelize')
const defaultOptions = {
  host: process.env.DB_HOST || 'city',
  logging: false,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
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
  it('should use default port if no port is provided', () => {
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
})
