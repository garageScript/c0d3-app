const path = require('path')
const homeDir = require('os').homedir()
const fs = require('fs')
const prompt = require('prompt')
const axios = require('axios')

module.exports = {
  getCredentials,
  validate,
  save
}

const credentialsPath = path.join(homeDir, '.c0d3', 'credentials.json')

async function getCredentials (url, dir = credentialsPath) {
  try {
    const creds = require(dir)
    const uId = await axios.get(`${url.origin}/verifySubmissionToken?token=${creds.cliToken}`)
    if (!uId || !uId.data || !uId.data.userId) throw new Error('Token Invalid')
    return creds
  } catch (e) {
    return askForUsernamePassword()
  }
}

function askForUsernamePassword () {
  return new Promise((resolve, reject) => {
    const schema = [
      {
        name: 'username',
        required: true
      },
      {
        name: 'password',
        hidden: true,
        replace: '*'
      }
    ]

    prompt.message = ''
    prompt.start()
    prompt.get(schema, (err, result) => {
      if (err) return reject('Unable to obtain username/password')
      resolve(result)
    })
  })
}

async function validate (credentials, url) {
  try {
    const cliToken = await axios.post(url, {
      username: credentials.username,
      password: credentials.password
    })
    if (!cliToken || !cliToken.data || !cliToken.data.cliToken) {
      return ''
    }
    return cliToken.data.cliToken
  } catch (e) {
    return ''
  }
}

async function save (credentials, cliToken) {
  try {
    createHiddenDir()
    await createCredentialsFile(credentialsPath, cliToken)
  } catch (e) {
    console.error('Unable to create hidden directory and save credentials')
  }
}

function createHiddenDir () {
  const hiddenDir = path.join(homeDir, '.c0d3')
  if (!fs.existsSync(hiddenDir)) {
    fs.mkdirSync(hiddenDir)
  }
}

function createCredentialsFile (dir = credentialsPath, cliToken) {
  return new Promise((resolve, reject) => {
    fs.writeFile(dir, JSON.stringify({ cliToken }), err => {
      if (err) return reject('Unable to save credentials')
      resolve()
    })
  })
}
