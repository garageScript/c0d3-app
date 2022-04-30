/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { allUsers } from './allUsers'

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
  test('Should return list of users', () => {
    prismaMock.user.findMany.mockResolvedValue(mockUsers)
    return expect(allUsers(null, null, ctx)).resolves.toEqual(mockUsers)
  })
})
