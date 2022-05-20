jest.mock('./discordAuth.ts')
jest.mock('./middleware/user')
jest.mock('./middleware/session')
jest.mock('./middleware/logger')
import { updateRefreshandAccessTokens } from './discordAuth'
import prismaMock from '../__tests__/utils/prismaMock'
import { jwt, session, signIn } from './nextAuth'
import loggingMiddleware from './middleware/logger'
import sessionMiddleware from './middleware/session'
import userMiddleware from './middleware/user'
import { getUserSession } from './getUserSession'

const res = {
  setHeader: jest.fn(),
  json: jest.fn(),
  status: jest.fn()
}
const req = {}

const defaultMiddleware = (_req, _res, next) => next()

loggingMiddleware.mockImplementation(defaultMiddleware)
sessionMiddleware.mockReturnValue(defaultMiddleware)

describe('Signin callback', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('Should return true when provider is not discord', async () => {
    expect.assertions(1)
    const signInCallback = signIn(req, res)

    const value = await signInCallback({
      account: {
        provider: 'credentials'
      },
      user: {
        id: 123
      }
    })

    expect(value).toBe(true)
  })

  describe('Connect to discord', () => {
    it('Should connect-to-discord when the provider is discord and there is previous session', async () => {
      expect.assertions(2)
      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = {
          id: 123,
          username: 'fakeUser'
        }
        next()
      })

      const signInCallback = signIn(req, res)

      const value = await signInCallback({
        account: {
          provider: 'discord'
        },
        user: {
          id: 123
        }
      })

      expect(updateRefreshandAccessTokens).toBeCalled()
      expect(value).toBe('/discord/success')
    })
  })

  describe('Login with discord', () => {
    it('Should redirect to /curriculum when user is found', async () => {
      expect.assertions(1)

      prismaMock.user.findFirst.mockResolvedValue({ id: 123 })

      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = null
        next()
      })

      const reqCopy = { ...req, session: { userId: null } }

      const signInCallback = signIn(reqCopy, res)

      const value = await signInCallback({
        account: {
          provider: 'discord'
        },
        user: {
          id: '123'
        }
      })

      expect(value).toBe('/curriculum')
    })

    it('Should redirect to /discord/404user when user is not found', async () => {
      expect.assertions(1)

      prismaMock.user.findFirst.mockResolvedValue(null)

      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = null
        next()
      })

      const reqCopy = { ...req, session: { userId: null } }

      const signInCallback = signIn(reqCopy, res)

      const value = await signInCallback({
        account: {
          provider: 'discord'
        },
        user: {
          id: '123'
        }
      })

      expect(value).toBe('/discord/404user')
    })
  })

  describe('getUserSession', () => {
    it('Should return the user in getUserSession if user is found', async () => {
      expect.assertions(1)
      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = {
          id: 123,
          username: 'fakeUser'
        }
        next()
      })

      const c0d3User = await getUserSession(req, res)

      expect(c0d3User).toStrictEqual({
        id: 123,
        username: 'fakeUser'
      })
    })

    it('Should return null in getUserSession if user not found', async () => {
      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = null
        next()
      })

      const c0d3User = await getUserSession(req, res)

      expect(c0d3User).toBe(null)
    })
  })
})

describe('JWT callback', () => {
  it('Should set user in token', () => {
    expect.assertions(1)

    const options = {
      token: {
        user: null
      },
      user: {
        id: 1
      }
    }

    const value = jwt(options)

    expect(value.user.id).toBe(1)
  })

  it('Should not set user in token if there is no user', () => {
    expect.assertions(1)

    const options = {
      token: {
        user: null
      },
      user: {
        id: 1
      }
    }

    const value = jwt({ ...options, user: null })

    expect(value.user).toBeFalsy()
  })
})

describe('Session callback', () => {
  it('Should set session.user to token.user', async () => {
    expect.assertions(1)

    const options = {
      token: {
        user: {
          id: 1
        }
      },
      session: {
        user: null
      }
    }

    const value = await session(options)

    expect(value.user.id).toBe(1)
  })
})
