// const cli = require('./cli.js')
import cli from './cli'

describe('c0d3.com cli', () => {
  test('displays error message for invalid commands', () => {
    let errorMessage = ''
    const log = msg => (errorMessage += msg)
    console.error = jest.fn(log)

    cli(['ignore', 'c0d3', 'invalid'])

    expect(errorMessage).toMatch(/invalid/)
  })
})
