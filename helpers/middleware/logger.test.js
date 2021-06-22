/**
 * @jest-environment node
 */

import util from 'util'
import { nanoid } from 'nanoid'
import winston from 'winston'
import logger, { processArgs, printFunc } from './logger'
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

  test('ProcessArgs function is processing string correctly', () => {
    expect(processArgs('string')).toEqual('string')
  })

  test('ProcessArgs function is processing error correctly', () => {
    const sampleErr = new Error('random err')
    expect(processArgs(sampleErr)).toEqual(sampleErr.toString())
  })

  test('ProcessArgs function is processing array correctly', () => {
    const sampleErr = new Error('random err')
    expect(processArgs([sampleErr, 'hello'])).toEqual(
      util.format('%j', [sampleErr.toString(), 'hello'])
    )
  })

  test('createLogger is called with correct parameters', () => {
    nanoid.mockImplementation(() => '12345')
    logger({}, { setHeader: (id, value) => {} }, () => {})
    expect(winston.createLogger).toBeCalled()
    expect(winston.format.combine).toBeCalled()
    expect(winston.format.colorize).toBeCalled()
    expect(winston.format.printf).toBeCalledWith(printFunc)
    expect(winston.format.timestamp).toBeCalledWith({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
    expect(winston.format.label).toBeCalledWith({
      label: '12345'
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
      req.info(['sample info message'])
    })
    expect(info).toBeCalledWith(util.format('%j', ['sample info message']))
  })

  test('testing warn() is called through req', () => {
    const warn = jest.fn()
    nanoid.mockImplementation(() => 48)
    winston.createLogger.mockImplementation(() => ({ warn }))
    const req = {}
    const res = { setHeader: (id, val) => {} }
    logger(req, res, () => {
      req.warn(['sample warning'])
    })
    expect(warn).toBeCalledWith(util.format('%j', ['sample warning']))
  })

  test('testing error() is called through req', () => {
    const error = jest.fn()
    nanoid.mockImplementation(() => 55)
    winston.createLogger.mockImplementation(() => ({ error }))
    const req = {}
    const res = { setHeader: (id, val) => {} }
    logger(req, res, () => {
      req.error(['sample error'])
    })
    expect(error).toBeCalledWith(util.format('%j', ['sample error']))
  })
})
