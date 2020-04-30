import { nanoid } from 'nanoid'
import winston from 'winston'
import logger, { printFunc } from './logger'
jest.mock('nanoid')
jest.mock('winston')

describe('Logger Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    winston.createLogger = jest.fn()
    winston.format.combine = jest.fn()
    winston.format.timestamp = jest.fn()
    winston.format.label = jest.fn()
    winston.format.colorize = jest.fn()
    winston.format.printf = jest.fn()
    winston.transports.Console = jest.fn()
  })

  test('Print Function is working as expected', () => {
    const currentTime = Date.now()
    const testInfo = {
      level: 'error',
      label: 'test2',
      message: 'you failed this test',
      timestamp: currentTime
    }
    expect(printFunc(testInfo)).toEqual(
      `${currentTime} error [test2]: you failed this test`
    )
  })

  test('createLogger is called with correct parameters', () => {
    const loggerFileName = `${__filename.split('.test.js')[0]}.ts` // Changes ext from .test.js to .ts
    logger({}, { setHeader: (id, value) => {} }, () => {})
    expect(winston.createLogger).toBeCalled()
    expect(winston.format.combine).toBeCalled()
    expect(winston.format.colorize).toBeCalled()
    expect(winston.format.printf).toBeCalledWith(printFunc)
    expect(winston.format.timestamp).toBeCalledWith({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
    expect(winston.format.label).toBeCalledWith({
      label: loggerFileName
    })
  })

  test('nanoid() is called in middleware', () => {
    logger({}, { setHeader: (id, value) => {} }, () => {})
    expect(nanoid).toBeCalled()
  })

  test('next() is called in middleware', () => {
    const nextFunction = jest.fn()
    logger({}, { setHeader: (id, value) => {} }, nextFunction)
    expect(nextFunction).toBeCalled()
  })

  test('testing info() is called through req', () => {
    const info = jest.fn()
    nanoid.mockImplementation(() => 32)
    winston.createLogger.mockImplementation(() => ({ info }))
    const req = {}
    const res = { setHeader: (id, val) => {} }
    logger(req, res, () => {
      req.info({ message: 'hello' })
    })
    expect(info).toBeCalledWith(
      JSON.stringify({
        requestId: 32,
        message: 'hello'
      })
    )
  })

  test('testing warn() is called through req', () => {
    const warn = jest.fn()
    nanoid.mockImplementation(() => 48)
    winston.createLogger.mockImplementation(() => ({ warn }))
    const req = {}
    const res = { setHeader: (id, val) => {} }
    logger(req, res, () => {
      req.warn({ message: 'warning' })
    })
    expect(warn).toBeCalledWith(
      JSON.stringify({
        requestId: 48,
        message: 'warning'
      })
    )
  })

  test('testing error() is called through req', () => {
    const error = jest.fn()
    nanoid.mockImplementation(() => 55)
    winston.createLogger.mockImplementation(() => ({ error }))
    const req = {}
    const res = { setHeader: (id, val) => {} }
    logger(req, res, () => {
      req.error({ message: 'error' })
    })
    expect(error).toBeCalledWith(
      JSON.stringify({
        requestId: 55,
        message: 'error'
      })
    )
  })
})
