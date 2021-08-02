import { gql } from '@apollo/client'
import { ApolloServer } from 'apollo-server-micro'
import { GraphQLTestResponse } from '../../@types/utils'
import { Query } from '../../graphql'
import { prisma } from '../../prisma'
import { startServer } from '../utils/apolloTestServer'

const GET_LESSONS = gql`
  query {
    lessons {
      id
      title
      order
      challenges {
        id
        title
        order
      }
    }
  }
`
describe('lessons query resolver', () => {
  let server: ApolloServer
  beforeAll(() => {
    server = startServer()
  })

  afterAll(async () => {
    await server.stop()
    await prisma.$disconnect()
  })
  it('should fetch lessons succesfully', async () => {
    const { data } = (await server.executeOperation({
      query: GET_LESSONS
    })) as GraphQLTestResponse<Pick<Query, 'lessons'>>
    expect(data).toMatchSnapshot()
  })
})
