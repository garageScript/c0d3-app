/**
 * @jest-environment node
 */
import prismaMock from '../../__tests__/utils/prismaMock'
import { changeAdminRights } from './adminController'

const mockUser = { username: 'penelope', status: true }

describe('Admin controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  prismaMock.user.update.mockResolvedValue(true)

  test('Should change admin rights', async () => {
    expect(changeAdminRights(null, mockUser, ctx)).resolves.toEqual({
      success: true
    })
  })
})
