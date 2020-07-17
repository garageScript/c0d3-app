import { allUsers } from './allUsers'
import db from '../../helpers/dbload'

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
    user: { isAdmin: 'true' }
  }
}

describe('allUsers resolver', () => {
  const { User } = db

  test('should return list of users', async () => {
    User.findAll = jest.fn().mockReturnValue(mockUsers)
    expect(allUsers(null, null, ctx)).toEqual(mockUsers)
  })

  test('Should throw Error when user is not an admin when querying allUsers', () => {
    ctx.req.user.isAdmin = 'false'
    expect(allUsers(null, null, ctx)).toBeNull
  })
})
