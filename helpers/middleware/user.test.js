/**
 * @jest-environment node
 */

jest.mock('../encoding.ts')
jest.mock('next-auth/react')

import prismaMock from '../../__tests__/utils/prismaMock'
import userMiddleware from './user'
import { decode } from '../encoding'
import { getSession } from 'next-auth/react'

const mockUserInfo = {
  id: 408,
  name: 'Kevin Le',
  username: 'moreThanFake',
  password: '$2b$10$W9KwQ6Sbi0RJjD2GZYX9BugAtgSm/W999gNW1f/XiRcI6NiC9pTdK',
  email: 'superduperkamehameha@gmail.com',
  isAdmin: false,
  cliToken: 'W29iamVjdCBPYmplY3Rd',
  cliVersion: '2.1.5'
}

const res = {}
const next = () => {}

describe('User Middleware', () => {
  beforeEach(() => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserInfo)
    prismaMock.user.findFirst.mockResolvedValue(mockUserInfo)
    prismaMock.user.update.mockResolvedValue(mockUserInfo)
  })
  test('Should return null when userId property of req.session is not there', async () => {
    expect.assertions(1)

    const req = {
      session: '',
      headers: {
        authorization: null
      }
    }
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull()
  })

  test('Should return correct info from database if session.userId exists', async () => {
    expect.assertions(1)

    const req = {
      session: {
        userId: 'noob'
      },
      headers: {
        authorization: null
      }
    }
    await userMiddleware(req, res, next)
    expect(req.user).toEqual(mockUserInfo)
  })
  test('Should return correct info from database if authorization header exists', async () => {
    expect.assertions(1)

    const req = {
      session: { userId: 'noob' },
      headers: {
        authorization:
          'Bearer eyJpZCI6MSwiY2xpVG9rZW4iOiJXMjlpYW1WamRDQlBZbXBsWTNSZCJ9'
      }
    }

    decode.mockReturnValue({
      cliToken: mockUserInfo.cliToken,
      cliVersion: mockUserInfo.cliVersion
    })

    await userMiddleware(req, res, next)
    expect(req.user).toEqual(mockUserInfo)
  })

  test('Should update cliVersion if user and cliVersion exists', async () => {
    expect.assertions(1)

    const req = {
      session: { userId: 'noob' },
      headers: {
        authorization:
          'Bearer eyJpZCI6MSwiY2xpVG9rZW4iOiJXMjlpYW1WamRDQlBZbXBsWTNSZCJ9'
      }
    }

    decode.mockReturnValue({
      cliToken: mockUserInfo.cliToken,
      cliVersion: mockUserInfo.cliVersion
    })

    await userMiddleware(req, res, next)
    expect(prismaMock.user.update).toBeCalledWith({
      where: {
        id: mockUserInfo.id
      },
      data: {
        cliVersion: mockUserInfo.cliVersion
      }
    })
  })

  test('Should not update cliVersion if user is null', async () => {
    expect.assertions(1)

    prismaMock.user.findFirst.mockResolvedValue(null)

    const req = {
      session: { userId: 'noob' },
      headers: {
        authorization:
          'Bearer eyJpZCI6MSwiY2xpVG9rZW4iOiJXMjlpYW1WamRDQlBZbXBsWTNSZCJ9'
      }
    }

    decode.mockReturnValue({
      cliToken: mockUserInfo.cliToken,
      cliVersion: mockUserInfo.cliVersion
    })

    await userMiddleware(req, res, next)
    expect(prismaMock.user.update).toBeCalledTimes(0)
  })

  test('Should not update cliVersion if cliVersion is null', async () => {
    expect.assertions(1)

    prismaMock.user.findFirst.mockResolvedValue(mockUserInfo)

    const req = {
      session: { userId: 'noob' },
      headers: {
        authorization:
          'Bearer eyJpZCI6MSwiY2xpVG9rZW4iOiJXMjlpYW1WamRDQlBZbXBsWTNSZCJ9'
      }
    }

    decode.mockReturnValue({
      cliToken: mockUserInfo.cliToken,
      cliVersion: null
    })

    await userMiddleware(req, res, next)
    expect(prismaMock.user.update).toBeCalledTimes(0)
  })

  test('Should set req.user to getSession if there is a session', async () => {
    expect.assertions(1)

    getSession.mockReturnValue({
      user: {
        userId: 'noob'
      }
    })

    const req = {
      user: null
    }

    await userMiddleware(req, res, next)
    expect(req.user).toStrictEqual({
      userId: 'noob'
    })
  })
})
