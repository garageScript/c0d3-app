import prismaMock from '../../__tests__/utils/prismaMock'
import { unlinkDiscord } from './unlinkDiscord'

const mockUser = {
  username: 'noob',
  id: 1
}

const ctx = { req: { user: { id: 1 } } }
const ctxWithError = { req: { user: { id: null } } }

describe('unlinkDiscord resolver', () => {
  it('should unlink discord successfully', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    expect(unlinkDiscord(null, null, ctx)).resolves.toStrictEqual(mockUser)
  })

  it('should throw error', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    expect(unlinkDiscord(null, null, ctxWithError)).rejects.toThrow(
      'Invalid user'
    )
  })
})
