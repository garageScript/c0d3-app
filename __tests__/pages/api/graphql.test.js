/*
 * Used to set the testing environment to node rather than browser
 * Source: https://jestjs.io/docs/en/configuration#testenvironment-string
 * @jest-environment node
 */

jest.mock('apollo-server-micro')
jest.mock('next-connect')
jest.mock('@quixo3/prisma-session-store')
jest.mock('express-session')
import nextConnect from 'next-connect'
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
  let apolloServerInput
  beforeEach(() => {
    nextConnect.mockImplementation(() => {
      return {
        use: returnHandler,
        get: returnHandler,
        post: returnHandler
      }
    })
    asm.ApolloServer = function (data) {
      apolloServerInput = data
      return {
        createHandler: jest.fn()
      }
    }
  })

  test('Should have correct config object', async () => {
    const { config } = require('../../../pages/api/graphql.ts')
    expect(config).toEqual({
      api: {
        bodyParser: false
      }
    })
  })

  test('Should call context', () => {
    const contextInput = { req: {} }
    require('../../../pages/api/graphql.ts')
    expect(apolloServerInput.context(contextInput)).toEqual(contextInput)
  })
})
