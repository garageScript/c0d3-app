/**
 * @jest-environment node
 */

import prismaMock from '../../__tests__/utils/prismaMock'
import { updateUserNames } from './userDataCrud'

const mockUsername = 'birdCatcher'
const mockName = 'bird spike'

describe('User Data CRUD resolvers', () => {
  it('Should update the user username and name', async () => {
    expect.assertions(1)

    const userMock = {
      username: mockUsername,
      name: mockName
    }

    prismaMock.user.update.mockResolvedValueOnce(userMock)

    expect(
      updateUserNames(
        null,
        { username: mockUsername, mockName },
        { req: { user: { id: 1 } } }
      )
    ).resolves.toStrictEqual(userMock)
  })
})
