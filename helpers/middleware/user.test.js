import { prisma } from '../../prisma'
import userMiddleware from './user'

const mockUserInfo = {
  id: 408,
  name: 'Kevin Le',
  username: 'moreThanFake',
  password: '$2b$10$W9KwQ6Sbi0RJjD2GZYX9BugAtgSm/W999gNW1f/XiRcI6NiC9pTdK',
  email: 'superduperkamehameha@gmail.com',
  isAdmin: false,
  cliToken: 'KfizzIlWp111fizzDbuzzr'
}

prisma.user.findUnique = jest.fn().mockReturnValue(mockUserInfo)

const res = {}
const next = () => {}

/*
 await must be used, because userMiddleware is an async function.
 Therefore, it must be used so 'expect' function does not run before
 userMiddleware is finished running.
*/
describe('User Middleware', () => {
  test('Should return null when userId property of req.session is not there', async () => {
    const req = { session: '' }
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull
  })

  test('Should return correct info from database if session.userId exists', async () => {
    const req = { session: { userId: 'noob' } }
    await userMiddleware(req, res, next)
    expect(req.user).toEqual(mockUserInfo)
  })
})
