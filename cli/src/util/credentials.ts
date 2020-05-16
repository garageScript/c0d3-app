import fs from 'fs'
import { request } from 'graphql-request'

import {
  Token,
  VerifyToken,
  GetToken,
  SaveToken,
  CreateCredentialsFile
} from '../@types/credentials'
import { IS_TOKEN_VALID, GET_CLI_TOKEN } from '../graphql'
import { CREDENTIALS_PATH, HIDDEN_DIR } from '../constants'
import * as message from '../messages'

export const verifyToken: VerifyToken = async url => {
  try {
    const { cliToken }: Token = require(CREDENTIALS_PATH)
    const { isTokenValid }: Token = await request(url, IS_TOKEN_VALID, {
      cliToken
    })
    return { isTokenValid, cliToken }
  } catch {
    return { isTokenValid: false, cliToken: '' }
  }
}

export const getToken: GetToken = async (credentials, url) => {
  const { cliToken }: Token = await request(
    url,
    GET_CLI_TOKEN,
    credentials
  ).catch(() => {
    throw message.WRONG_CREDENTIALS
  })

  return cliToken
}

export const saveToken: SaveToken = async cliToken => {
  try {
    createHiddenDir()
    await createCredentialsFile(cliToken)
  } catch {
    throw message.SAVE_TOKEN_ERROR
  }
}

export const createHiddenDir = () => {
  if (!fs.existsSync(HIDDEN_DIR)) {
    fs.mkdirSync(HIDDEN_DIR)
  }
}

export const createCredentialsFile: CreateCredentialsFile = cliToken => {
  return new Promise((resolve, reject) => {
    fs.writeFile(CREDENTIALS_PATH, JSON.stringify({ cliToken }), err => {
      if (err) reject()
      resolve()
    })
  })
}
