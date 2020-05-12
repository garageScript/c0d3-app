import path from 'path'
import { homedir } from 'os'
import boxen from 'boxen'

const HOME = homedir()

const DIR = '.c0d3'

const CREDENTIAL_FILE = 'credentials.json'

export const CREDENTIALS_PATH = path.join(HOME, DIR, CREDENTIAL_FILE)

export const HIDDEN_DIR = path.join(HOME, DIR)

export const URL = 'https://c0d3.com/api/graphql'

export const DEBUG_TOKEN = '1txkbwq0v1kHhzyGZaf53'
