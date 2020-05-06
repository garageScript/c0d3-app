#!/usr/bin/env node

import { createCommand } from 'commander'
import chalk from 'chalk'

import { version } from './package.json'
import submit from './src/submit'

const program = createCommand()
const PRIMARY = '#5438dc' // c0d3.com PRIMARY color
const URL = 'https://c0d3.com/api/graphql'

program
  .version(
    `c0d3 cli version: ${version}`,
    undefined,
    'Show the c0d3 cli version'
  )
  .helpOption(undefined, 'Display help menu')
  .usage(
    `[options] \n\n  ${chalk
      .hex(PRIMARY)
      .bold('A command line interface (CLI) for c0d3.com')}`
  )

// List Command
program
  .command('submit')
  .alias('s')
  .description('Submits git diff of challenge to c0d3.com')
  .option('--url < test > ', 'Set url endpoint for http request', URL)
  .option('-d, --debug')
  .action(submit)

program.parse(process.argv)

if (!program.args.length) program.help()
