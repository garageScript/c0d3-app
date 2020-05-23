import { exec } from 'child_process'
import { createCommand } from 'commander'

jest.mock('commander')

const program = {
  version: () => program,
  helpOption: () => program,
  usage: () => program,
  command: () => program,
  alias: () => program,
  description: () => program,
  option: () => program,
  action: () => program,
  parse: () => program,
  help: jest.fn(),
  args: []
}

createCommand.mockReturnValue(program)
const { init } = require('./cli')

describe('CLI c0d3', () => {
  test('Should run c0d3', () => {
    expect(createCommand).toHaveBeenCalled()
  })

  test('Should run c0d3 --help', () => {
    init()
    expect(program.help).toHaveBeenCalled()
  })

  test('Should not run c0d3 --help', () => {
    program.args = ['submit']
    program.help = jest.fn()
    init()
    expect(program.help).not.toHaveBeenCalled()
  })
})
