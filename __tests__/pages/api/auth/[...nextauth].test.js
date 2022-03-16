/**
 * @jest-environment node
 */

jest.mock('next-auth')
jest.mock('../../../../helpers/nextAuth.ts')
import { providers, signIn } from '../../../../helpers/nextAuth'
import nextAuthMiddleware from '../../../../pages/api/auth/[...nextauth]'
import NextAuth from 'next-auth'

describe('next-auth middleware', () => {
  test('Should we initialized with the correct options', async () => {
    const res = {
      setHeader: jest.fn(),
      json: jest.fn(),
      status: jest.fn()
    }
    const req = {}

    const options = {
      providers,
      callbacks: {
        signIn: signIn(req, res)
      }
    }

    res.status.mockReturnValue(res)
    nextAuthMiddleware(req, res)

    expect(NextAuth).toBeCalledWith(req, res, options)
  })
})
