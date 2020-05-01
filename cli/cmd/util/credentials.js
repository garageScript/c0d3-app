const path = require('path')
const chalk = require('chalk')
const homeDir = require('os').homedir()
const fs = require('fs')
const prompt = require('prompt')
const { request } = require('graphql-request')
const { IS_TOKEN_VALID, GET_CLI_TOKEN } = require('../util/graphql')

const DIR = '.c0d3'

const credentialsPath = path.join(homeDir, DIR, 'credentials.json')

const verifyToken = async url => {
  try {
    const { cliToken } = require(credentialsPath)
    const { isTokenValid } = await request(url, IS_TOKEN_VALID, {
      cliToken
    })
    return { isTokenValid, cliToken } || false
  } catch {
    return false
  }
}

const askCredentials = () => {
  return new Promise((resolve, reject) => {
    const schema = [
      {
        description: chalk.rgb(84, 64, 216).bold('username'),
        name: 'username',
        required: true
      },
      {
        description: chalk.rgb(84, 64, 216).bold('password'),
        name: 'password',
        hidden: true,
        replace: '*'
      }
    ]

    prompt.message = ''
    prompt.start()
    prompt.get(schema, (err, result) => {
      if (err) {
        return reject(chalk.red('\n  Unable to obtain username/password'))
      }
      resolve(result)
    })
  })
}

const getToken = async (credentials, url) => {
  try {
    const { username, password } = credentials
    const { cliToken } = await request(url, GET_CLI_TOKEN, {
      username,
      password
    })
    return cliToken
  } catch (error) {
    console.log(chalk.red('Invalid credentials, please try again!'))
    return askCredentials()
  }
}

const saveToken = async cliToken => {
  try {
    createHiddenDir()
    await createCredentialsFile(credentialsPath, cliToken)
  } catch {
    console.error('Unable to create hidden directory and save credentials')
  }
}

const createHiddenDir = () => {
  const hiddenDir = path.join(homeDir, DIR)
  if (!fs.existsSync(hiddenDir)) {
    fs.mkdirSync(hiddenDir)
  }
}

const createCredentialsFile = (credentialsPath, cliToken) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(credentialsPath, JSON.stringify({ cliToken }), err => {
      if (err) return reject('Unable to save credentials')
      resolve()
    })
  })
}

module.exports = {
  verifyToken,
  askCredentials,
  getToken,
  saveToken
}
