/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import userMiddleware from './user'

const mockUserInfo = {
  id: 408,
  name: 'Kevin Le',
  username: 'moreThanFake',
  password: '$2b$10$W9KwQ6Sbi0RJjD2GZYX9BugAtgSm/W999gNW1f/XiRcI6NiC9pTdK',
  email: 'superduperkamehameha@gmail.com',
  isAdmin: false,
  cliToken: 'W29iamVjdCBPYmplY3Rd'
}

const res = {}
const next = () => {}

/*
 await must be used, because userMiddleware is an async function.
 Therefore, it must be used so 'expect' function does not run before
 userMiddleware is finished running.
*/
describe('User Middleware', () => {
  beforeEach(() => {
    prismaMock.user.findUnique.mockResolvedValue(mockUserInfo)
    prismaMock.user.findFirst.mockResolvedValue(mockUserInfo)
  })
  test('Should return null when userId property of req.session is not there', async () => {
    const req = {
      session: '',
      headers: {
        authorization: null
      }
    }
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull
  })

  test('Should return correct info from database if session.userId exists', async () => {
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
    const req = {
      session: { userId: 'noob' },
      headers: {
        authorization:
          'Bearer eyJpZCI6MSwiY2xpVG9rZW4iOiJXMjlpYW1WamRDQlBZbXBsWTNSZCJ9'
      }
    }
    await userMiddleware(req, res, next)
    expect(req.user).toEqual(mockUserInfo)
  })
})
