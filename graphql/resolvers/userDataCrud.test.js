/**
 * @jest-environment node
 */

jest.mock('bcrypt')

import prismaMock from '../../__tests__/utils/prismaMock'
import { updateUserNames, updateUserPassword } from './userDataCrud'
import bcrypt from 'bcrypt'

const mockUsername = 'birdCatcher'
const mockName = 'bird spike'
const mockPassword = 'password'
const newPasswordMock = 'drowssap'

describe('User Data CRUD resolvers', () => {
  describe('Update user names resolver', () => {
    it('Should update the user username and name', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName
      }

      prismaMock.user.update.mockResolvedValueOnce(userMock)
      prismaMock.user.findFirst.mockResolvedValueOnce(null)

      expect(
        updateUserNames(
          null,
          { username: mockUsername, mockName },
          { req: { user: { id: 1 } } }
        )
      ).resolves.toStrictEqual(userMock)
    })

    it('Should not update the user username and name if username already used', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName
      }

      prismaMock.user.update.mockResolvedValueOnce(userMock)
      prismaMock.user.findFirst.mockResolvedValueOnce(userMock)

      expect(
        updateUserNames(
          null,
          { username: mockUsername, mockName },
          { req: { user: { id: 1 } } }
        )
      ).rejects.toEqual(Error('Username is already used'))
    })
  })
  describe('Update user password resolver', () => {
    it('Should update the user password', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName,
        password: mockPassword
      }

      prismaMock.user.findFirst.mockResolvedValueOnce(userMock)
      bcrypt.compare.mockResolvedValueOnce(true)

      expect(
        updateUserPassword(
          null,
          {
            newPassword: newPasswordMock,
            currentPassword: mockPassword,
            newPasswordAgain: newPasswordMock
          },
          { req: { user: { id: 1 } } }
        )
      ).resolves.toEqual({ success: true })
    })
    it('Should not update the user password if the new password and the re-entered one do not match', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName,
        password: mockPassword
      }

      prismaMock.user.findFirst.mockResolvedValueOnce(userMock)

      expect(
        updateUserPassword(
          null,
          {
            newPassword: newPasswordMock,
            currentPassword: mockPassword,
            newPasswordAgain: newPasswordMock.slice(
              0,
              newPasswordMock.length - 2
            )
          },
          { req: { user: { id: 1 } } }
        )
      ).rejects.toEqual(Error("Passwords don't match"))
    })
    it('Should not update the user password if the current password is invalid', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName,
        password: mockPassword
      }

      prismaMock.user.findFirst.mockResolvedValueOnce(userMock)
      bcrypt.compare.mockResolvedValueOnce(false)

      expect(
        updateUserPassword(
          null,
          {
            newPassword: newPasswordMock,
            currentPassword: 'someWrongPassword',
            newPasswordAgain: newPasswordMock
          },
          { req: { user: { id: 1 } } }
        )
      ).rejects.toEqual(Error('Current password is invalid'))
    })
    it('Should not update the user password if the user password is not found', async () => {
      expect.assertions(1)

      const userMock = {
        username: mockUsername,
        name: mockName,
        password: null
      }

      prismaMock.user.findFirst.mockResolvedValueOnce(userMock)
      bcrypt.compare.mockResolvedValueOnce(false)

      expect(
        updateUserPassword(
          null,
          {
            newPassword: newPasswordMock,
            currentPassword: 'someWrongPassword',
            newPasswordAgain: newPasswordMock
          },
          { req: { user: { id: 1 } } }
        )
      ).rejects.toEqual(Error('Current password is invalid'))
    })
  })
})
