import userMiddleware from './user'
import db from '../dbload'

const { User } = db

const mockUserInfo = {
  dataValues: {
    id: 408,
    name: 'Kevin Le',
    username: 'moreThanFake',
    password: '$2b$10$W9KwQ6Sbi0RJjD2GZYX9BugAtgSm/W999gNW1f/XiRcI6NiC9pTdK',
    email: 'superduperkamehameha@gmail.com',
    isAdmin: 'false',
    cliToken: 'KfizzIlWp111fizzDbuzzr'
  }
}

User.findOne = jest.fn().mockReturnValue(mockUserInfo)

const res = {}
const next = () => {}

/*
 await must be used, because userMiddleware is an async function.
 Therefore, it must be used so 'expect' function does not run before
 userMiddleware is finished running.
*/
describe('User Middleware', () => {
  test('Returns null when session property of req is not there', async () => {
    const req = {}
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull
  })

  test('Returns null when userId property of req.session is not there', async () => {
    const req = { session: '' }
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull
  })

  test('Returns correct info from Database if session.userId exists and its value is truthy', async () => {
    const req = { session: { userId: 'noob' } }
    await userMiddleware(req, res, next)
    expect(req.user).toEqual(mockUserInfo.dataValues)
  })

  test('Returns correct info from Database if session.userId exists but is a falsy value', async () => {
    const req = { session: { userId: '' } }
    await userMiddleware(req, res, next)
    expect(req.user).toBeNull
  })
})
