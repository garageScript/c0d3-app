import { nanoid } from 'nanoid'
import winston from 'winston'
import logger, { winstonLogger, printFunc } from './logger'
jest.mock('nanoid')
jest.mock('winston')

describe('Logger Helper Function', () => {
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

  test('Logger is being initialized correctly when logger file is called', () => {
    winstonLogger('test1')
    expect(winston.createLogger).toBeCalled()
    expect(winston.format.combine).toBeCalled()
    expect(winston.format.colorize).toBeCalled()
    expect(winston.format.printf).toBeCalledWith(printFunc)
    expect(winston.format.timestamp).toBeCalledWith({
      format: 'YYYY-MM-DD HH:mm:ss'
    })
    expect(winston.format.label).toBeCalledWith({
      label: 'test1'
    })
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

  test('nanoid() is called in middleware', () => {
    logger({}, { setHeader: (id, value) => {} }, () => {})
    expect(nanoid).toBeCalled()
  })

  test('next() is called in middleware', () => {
    const nextFunction = jest.fn()
    logger({}, { setHeader: (id, value) => {} }, nextFunction)
    expect(nextFunction).toBeCalled()
  })

  test('Logged is called with filename in middleware', () => {
    const loggerFileName = `${__filename.split('.test.js')[0]}.ts` // Changes ext from .test.js to .ts
    logger({}, { setHeader: (id, value) => {} }, () => {})
    expect(winston.format.label).toBeCalledWith({
      label: loggerFileName
    })
  })
})
