jest.mock('./discordAuth.ts')
jest.mock('./middleware/user')
jest.mock('./middleware/session')
jest.mock('./middleware/logger')
jest.mock('../graphql/resolvers/authController.ts')
import { updateRefreshandAccessTokens } from './discordAuth'
import prismaMock from '../__tests__/utils/prismaMock'
import { authorize, providers, signIn } from './nextAuth'
import loggingMiddleware from './middleware/logger'
import sessionMiddleware from './middleware/session'
import userMiddleware from './middleware/user'
import { getUserSession } from './getUserSession'
import { login, signup } from '../graphql/resolvers/authController'

const partialCredentials = { username: 'noob', password: 'noob123' }
const credentials = {
  ...partialCredentials,
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
      value[0].id === 'discord' && value[1].id === 'credentials'

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

    expect(user.id).toBe(id)
  })

  test('Should return null', async () => {
    expect.assertions(1)

    signup.mockImplementation(() => null)
    const user = await authorize(req, res)(credentials)

    expect(user).toBe(null)
  })
})
