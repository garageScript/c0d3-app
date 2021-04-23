import { allUsers } from './allUsers'
import { prisma } from '../../prisma'

const mockUsers = [
  {
    username: 'lolcakes',
    id: 2
  },
  {
    username: 'superLolcakes',
    id: 6
  }
]

const ctx = {
  req: {
    user: { isAdmin: true }
  }
}

describe('allUsers resolver', () => {
  test('Should return list of users', async () => {
    prisma.user.findMany = jest.fn().mockReturnValue(mockUsers)
    expect(allUsers(null, null, ctx)).toEqual(mockUsers)
  })

  test('Should return null when user is not an admin when querying allUsers', () => {
    ctx.req.user.isAdmin = false
    expect(allUsers(null, null, ctx)).toBeNull
  })
})
