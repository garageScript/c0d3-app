/*
 * Used to set the testing environment to node rather than browser
 * Source: https://jestjs.io/docs/en/configuration#testenvironment-string
 * @jest-environment node
 */

jest.mock('apollo-server-micro')
jest.mock('next-connect')
jest.mock('@quixo3/prisma-session-store')
jest.mock('express-session')
jest.mock('@sentry/nextjs')
import { createRouter } from 'next-connect'
import session from 'express-session'
const asm = require('apollo-server-micro')

const returnHandler = () => {
  return {
    use: returnHandler,
    get: returnHandler,
    post: returnHandler
  }
}

session.mockImplementation(() => {
  return {}
})

describe('Graphql Api', () => {
  const OLD_ENV = process.env
  let apolloServerInput

  beforeEach(() => {
    process.env = { ...OLD_ENV }

    createRouter.mockImplementation(() => {
      return {
        use: returnHandler,
        get: returnHandler,
        post: returnHandler,
        handler: () => {}
      }
    })
    asm.ApolloServer = function (data) {
      apolloServerInput = data
      return {
        createHandler: jest.fn()
      }
    }
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  test('Should have correct config object', async () => {
    jest.isolateModules(() => {
      expect(require('../../../pages/api/graphql.ts').config).toEqual({
        api: {
          bodyParser: false
        }
      })
    })
  })

  test('Should have correct config object when deployed as a preview', async () => {
    jest.isolateModules(() => {
      process.env = {
        ...OLD_ENV,
        VERCEL_ENV: 'preview',
        NODE_ENV: 'production'
      }

      require('../../../pages/api/graphql.ts')

      expect(
        apolloServerInput.playground && apolloServerInput.introspection
      ).toBeTruthy()
    })
  })

  test('Should not have correct config object when deployed as a preview', async () => {
    jest.isolateModules(() => {
      process.env = {
        ...OLD_ENV,
        VERCEL_ENV: '',
        NODE_ENV: ''
      }

      require('../../../pages/api/graphql.ts')
      expect(
        apolloServerInput.playground && apolloServerInput.introspection
      ).toBeFalsy()
    })
  })

  test('Should have correct config object when deployed as a dev deployment', async () => {
    process.env = {
      ...OLD_ENV,
      VERCEL_ENV: 'production',
      NODE_ENV: 'development'
    }

    require('../../../pages/api/graphql.ts')
    expect(
      apolloServerInput.playground && apolloServerInput.introspection
    ).toBeTruthy()
  })

  test('Should call context', () => {
    const contextInput = { req: {} }
    require('../../../pages/api/graphql.ts')
    expect(apolloServerInput.context(contextInput)).toEqual(contextInput)
  })
})
