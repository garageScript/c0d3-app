jest.mock('../dbload')
jest.mock('../mattermost')
import db from '../dbload'
import { changeAdminRights } from './adminController'

const { User } = db

const mockUser = { username: 'penelope', status: true }

describe('Admin controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: 'true' }
    }
  }

  test('Should change admin rights', async () => {
    User.update = jest.fn().mockReturnValue(true)
    expect(changeAdminRights(null, mockUser, ctx)).resolves.toEqual({
      success: true
    })
  })

  test('Should throw error when user is not an admin', async () => {
    ctx.req.user.isAdmin = 'false'
    expect(changeAdminRights(null, mockUser, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
