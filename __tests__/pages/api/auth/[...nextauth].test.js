/**
 * @jest-environment node
 */

jest.mock('next-auth')
jest.mock('../../../../helpers/nextAuth.ts')
import { providers, signIn, jwt, session } from '../../../../helpers/nextAuth'
import nextAuthMiddleware from '../../../../pages/api/auth/[...nextauth]'
import NextAuth from 'next-auth'

describe('next-auth middleware', () => {
  test('Should be initialized with the correct options', async () => {
    expect.assertions(1)

    const res = {
      setHeader: jest.fn(),
      json: jest.fn(),
      status: jest.fn()
    }
    const req = {}

    const options = {
      providers,
      callbacks: {
        signIn: signIn(req, res),
        jwt,
        session
      },
      secret: process.env.SESSION_SECRET
    }

    res.status.mockReturnValue(res)
    nextAuthMiddleware(req, res)

    expect(NextAuth).toBeCalledWith(req, res, options)
  })
})
