import path from 'path'
import chalk from 'chalk'
import { homedir } from 'os'
import fs from 'fs'
import { prompt } from 'enquirer'
import ora from 'ora'
import { request } from 'graphql-request'
import { IS_TOKEN_VALID, GET_CLI_TOKEN } from './graphql'

const HOME = homedir()
const DIR = '.c0d3'
const CREDENTIAL_FILE = 'credentials.json'
const QUESTIONS = [
  {
    type: 'input',
    name: 'username',
    message: 'Username:'
  },
  {
    type: 'password',
    mask: '*',
    name: 'password',
    message: 'Password:'
  }
]
const spinner = ora()
const credentialsPath = path.join(HOME, DIR, CREDENTIAL_FILE)

type Token = {
  cliToken: string
  isTokenValid: boolean
}

type Credential = {
  username: string
  password: string
}

export const verifyToken = async (url: string): Promise<Token> => {
  try {
    const { cliToken }: Token = require(credentialsPath)
    const { isTokenValid }: Token = await request(url, IS_TOKEN_VALID, {
      cliToken
    })
    return { isTokenValid, cliToken }
  } catch {
    return {
      isTokenValid: false,
      cliToken: ''
    }
  }
}

export const askCredentials = async (): Promise<Credential> => {
  const { username, password } = await prompt(QUESTIONS)
  spinner.start('Login...')
  if (!username || !password) {
    spinner.fail(chalk.red.bold('Unable to obtain username/password\n'))
    return askCredentials()
  }
  return { username, password }
}

export const getToken = async (
  credentials: Credential,
  url: string
): Promise<Token['cliToken']> => {
  const { cliToken } = await request(url, GET_CLI_TOKEN, credentials).catch(
    () => {
      spinner.fail(chalk.red.bold('Invalid credentials, please try again!\n'))
      throw ''
    }
  )
  return cliToken
}

export const saveToken = async (cliToken: Token['cliToken']): Promise<void> => {
  try {
    createHiddenDir()
    await createCredentialsFile(cliToken)
  } catch {
    spinner.fail(
      chalk.red.bold('Unable to create hidden directory and save credentials\n')
    )
    throw ''
  }
  spinner.succeed('You are logged in')
}

export const createHiddenDir = () => {
  const hiddenDir = path.join(HOME, DIR)
  if (!fs.existsSync(hiddenDir)) {
    fs.mkdirSync(hiddenDir)
  }
}

export const createCredentialsFile = (
  cliToken: Token['cliToken']
): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(credentialsPath, JSON.stringify({ cliToken }), err => {
      if (err) reject()
      resolve()
    })
  })
}
