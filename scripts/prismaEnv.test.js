jest.mock('fs/promises')
jest.mock('path')
import { writeFile } from 'fs/promises'
import path from 'path'
import { prismaEnv } from './prismaEnv'

describe('prismaEnv script', () => {
  const OLD_ENV = process.env
  const NEW_ENVS = {
    DB_USER: 'fakeuser',
    DB_PW: 'fakepw',
    DB_HOST: 'fakehost',
    DB_PORT: 5432,
    DB_NAME: 'fakedb'
  }

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()
    process.env = { ...OLD_ENV, ...NEW_ENVS }
  })

  afterAll(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it('should create a prisma/.env file if running on Vercel', () => {
    process.env.VERCEL = 1
    const file = '/app/prisma/.env'
    const DB_URL = `postgresql://${NEW_ENVS.DB_USER}:${NEW_ENVS.DB_PW}@${NEW_ENVS.DB_HOST}:${NEW_ENVS.DB_PORT}/${NEW_ENVS.DB_NAME}`
    path.join = jest.fn().mockReturnValueOnce(file)
    prismaEnv()
    expect(writeFile).toBeCalledWith(file, `DB_URL=${DB_URL}`, 'utf-8')
  })

  it('should not create the file when not running on Vercel', () => {
    prismaEnv()
    expect(writeFile).not.toBeCalled()
  })
})
