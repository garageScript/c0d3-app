import fs, { promises as fsPromises } from 'fs'
import * as credentials from './credentials'
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
    if (!fs.existsSync(HIDDEN_DIR)) {
      await credentials.saveToken('initToken')
    }
    let { cliToken }: Token = await require(CREDENTIALS_PATH)
    const { isTokenValid }: Token = await request(url, IS_TOKEN_VALID, {
      cliToken
    })
    if (!isTokenValid) cliToken = ''
    return { isTokenValid, cliToken }
  } catch (error) {
    throw new Error(error)
  }
}

export const getToken: GetToken = async (credentials, url) => {
  const { cliToken } = await request<Token>(
    url,
    GET_CLI_TOKEN,
    credentials
  ).catch(() => {
    throw new Error(message.WRONG_CREDENTIALS)
  })

  return cliToken
}

export const saveToken: SaveToken = async cliToken => {
  try {
    credentials.createHiddenDir()
    await credentials.createCredentialsFile(cliToken)
  } catch {
    throw new Error(message.SAVE_TOKEN_ERROR)
  }
}

export const createHiddenDir = () => {
  if (!fs.existsSync(HIDDEN_DIR)) {
    fs.mkdirSync(HIDDEN_DIR)
    return true
  }
  return false
}

export const createCredentialsFile: CreateCredentialsFile = async cliToken => {
  await fsPromises
    .writeFile(CREDENTIALS_PATH, JSON.stringify({ cliToken }))
    .catch(err => {
      throw new Error(err)
    })
}
