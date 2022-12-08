jest.mock('./discordAuth.ts')
jest.mock('./middleware/user')
jest.mock('./middleware/session')
jest.mock('./middleware/logger')
jest.mock('../graphql/resolvers/authController.ts')
jest.mock('../graphql/resolvers/passwordController')
jest.mock('./encoding')

import { updateRefreshandAccessTokens } from './discordAuth'
import prismaMock from '../__tests__/utils/prismaMock'
import {
  authorize,
  providers,
  jwt,
  session,
  signIn,
  authorizeEmailVerification
} from './nextAuth'
import loggingMiddleware from './middleware/logger'
import sessionMiddleware from './middleware/session'
import userMiddleware from './middleware/user'
import { getUserSession } from './getUserSession'
import { login, signup } from '../graphql/resolvers/authController'
import { changePw } from '../graphql/resolvers/passwordController'
import { decode } from './encoding'

const partialCredentials = { username: 'noob', password: 'noob123' }
const credentials = {
  username: 'noob',
  firstName: 'noob',
  lastName: 'pro',
  email: 'noob@gmail.com'
}

const res = {
  setHeader: jest.fn(),
  json: jest.fn(),
  status: jest.fn()
}
const req = {}

const defaultMiddleware = (_req, _res, next) => next()

loggingMiddleware.mockImplementation(defaultMiddleware)
sessionMiddleware.mockReturnValue(defaultMiddleware)

describe('Providers', () => {
  test('Should call providers with request and response objects', () => {
    expect.assertions(1)

    const value = providers(req, res)
    const hasProviders =
      value[0].id === 'discord' &&
      value[1].id === 'credentials' &&
      value[2].options.id === 'confirm-token'

    value[2]

    expect(hasProviders).toBeTruthy()
  })
})

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

  it('Should cancel signIn flow if account does not exist', async () => {
    expect.assertions(1)
    const signInCallback = signIn(req, res)

    const value = await signInCallback({
      user: {
        id: 123
      }
    })

    expect(value).toBe(false)
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
      expect(value).toBe(true)
    })

    it('Should redirect to /discord/success if a different user is already connected to the same discord account', async () => {
      expect.assertions(1)
      userMiddleware.mockImplementation((req, _res, next) => {
        req.user = {
          id: 123,
          username: 'fakeUser'
        }
        next()
      })

      prismaMock.user.findFirst.mockResolvedValue({
        id: 124
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

      expect(value).toBe('/discord/success?error=connected')
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

      expect(value).toBe(true)
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
  it('Should set user in token if flow type is credentials (login/signup)', async () => {
    expect.assertions(1)

    const options = {
      token: {
        user: null
      },
      user: {
        id: 1
      },
      account: { type: 'credentials' }
    }

    const value = await jwt(options)

    expect(value.user.id).toBe(1)
  })

  it('Should not set user in token if there is no user', async () => {
    expect.assertions(1)

    const options = {
      token: {
        user: null
      },
      user: {
        id: 1
      }
    }

    const value = await jwt({ ...options, user: null })

    expect(value.user).toBeFalsy()
  })

  it('Should set user from database as token user if flow type is oauth (discord)', async () => {
    expect.assertions(1)

    const options = {
      token: {
        user: null
      },
      user: {
        id: 1
      },
      account: { type: 'oauth' }
    }

    await jwt(options)

    expect(prismaMock.user.findFirst).toBeCalled()
  })
})

describe('Session callback', () => {
  it("Should set session's user to token's user", async () => {
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

    prismaMock.user.findFirst.mockResolvedValue({ id: options.token.user.id })

    const value = await session(options)

    expect(value.user.id).toBe(1)
  })

  it("Should not set session's user to token's user if the token's user does not exist", async () => {
    expect.assertions(1)

    const options = {
      token: {},
      session: {
        user: null
      }
    }

    const value = await session(options)

    expect(value.user).toBe(null)
  })
})

describe('Authorize callback', () => {
  test('Should login user', async () => {
    expect.assertions(1)

    const id = 123
    prismaMock.user.findFirst.mockResolvedValue({ id })

    login.mockImplementation(() => ({ id }))
    const user = await authorize(req, res)(partialCredentials)

    expect(user.id).toBe(id)
  })

  test('Should signup user', async () => {
    expect.assertions(1)

    const id = 124
    prismaMock.user.findFirst.mockResolvedValue({ id })

    signup.mockImplementation(() => ({ id }))
    const user = await authorize(req, res)(credentials)

    expect(user).toStrictEqual({})
  })

  test('Should cancel flow if login/signup failed', async () => {
    expect.assertions(1)

    const id = 123
    prismaMock.user.findFirst.mockResolvedValue({ id })

    login.mockResolvedValue(undefined)
    const user = await authorize(req, res)(partialCredentials)

    expect(user).toBe(null)
  })
})

describe('Confirm token authorize callback', () => {
  const credentials = {
    password: 'password',
    token: 'eyJ1c2VySWQiOjksInVzZXJUb2tlbiI6IkZCeFBTbkRfc3o5WldKVmV5NWpk1111'
  }
  test('Should throw error if token or password are not present', async () => {
    expect.assertions(1)

    expect(
      authorizeEmailVerification({ password: '', token: '' })
    ).rejects.toStrictEqual(new Error('Missing token or password'))
  })

  test('Should change password successfully', async () => {
    expect.assertions(1)

    prismaMock.user.findFirst.mockResolvedValue({
      id: 123
    })

    decode.mockResolvedValue({
      userId: 123
    })
    changePw.mockResolvedValue({
      success: true
    })

    expect(authorizeEmailVerification(credentials)).resolves.toStrictEqual({
      id: 123
    })
  })

  test('Should return null if user from db is invalid', async () => {
    expect.assertions(1)

    prismaMock.user.findFirst.mockResolvedValue(null)

    decode.mockResolvedValue({
      userId: 123
    })
    changePw.mockResolvedValue({
      success: true
    })

    expect(authorizeEmailVerification(credentials)).resolves.toBe(null)
  })

  test('Should handle promise reject', async () => {
    expect.assertions(1)

    prismaMock.user.findFirst.mockResolvedValue({
      id: 123
    })

    decode.mockResolvedValue({
      userId: 123
    })
    changePw.mockRejectedValue(new Error('Invalid token'))

    expect(authorizeEmailVerification(credentials)).rejects.toStrictEqual(
      new Error('Invalid token')
    )
  })
})
