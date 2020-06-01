/*
 * Used to set the testing environment to node rather than browser
 * Source: https://jestjs.io/docs/en/configuration#testenvironment-string
 * @jest-environment node
 */

jest.mock('apollo-server-micro')
jest.mock('next-connect')
jest.mock('connect-session-sequelize')
jest.mock('express-session')
jest.mock('sequelize')
jest.mock('mailgun-js')
jest.mock('../../../helpers/dbload')
import nextConnect from 'next-connect'
import connectSequelize from 'connect-session-sequelize'
import session from 'express-session'
import sequelize from 'sequelize'
const asm = require('apollo-server-micro')

sequelize.mockImplementation(function() {
  return { sync: () => {} }
})

const db = require('../../../helpers/dbload')
db.sequelize = {}

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
    connectSequelize.mockImplementation(() => {
      return function() {}
    })
    asm.ApolloServer = function(data) {
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
