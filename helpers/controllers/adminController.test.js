import { prisma } from '../../prisma'
import { changeAdminRights } from './adminController'

const mockUser = { username: 'penelope', status: true }

describe('Admin controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  prisma.user.update = jest.fn().mockResolvedValue(true)

  test('Should change admin rights', async () => {
    expect(changeAdminRights(null, mockUser, ctx)).resolves.toEqual({
      success: true
    })
  })

  test('Should throw error when user is not an admin', async () => {
    ctx.req.user.isAdmin = false
    expect(changeAdminRights(null, mockUser, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
