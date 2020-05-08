#!/usr/bin/env node

import updateNotifier from 'update-notifier'
import { createCommand } from 'commander'
import { bold } from 'chalk'

import submit from './commands/submit'
import pkg, { version } from '../package.json'
import { URL } from './constants'

updateNotifier({ pkg, updateCheckInterval: 0 }).notify()
const program = createCommand()
console.clear()

// List Options
program
  .version(
    `c0d3 cli version: ${bold.magenta(version)}`,
    undefined,
    'Show the c0d3 cli version'
  )
  .helpOption(undefined, 'Display help menu').usage(`[options]

  ${bold.magenta('A command line interface (CLI) for c0d3.com')}`)

// List Commands
program
  .command('submit')
  .alias('s')
  .description('Submits git diff of challenge to c0d3.com')
  .option('--url <url> ', 'Set url endpoint for http request', URL)
  .option('-d, --debug')
  .action(submit)

program.parse(process.argv)

if (!program.args.length) program.help()
