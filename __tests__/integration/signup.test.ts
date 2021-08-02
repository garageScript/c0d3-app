import { User } from '@prisma/client'
import { ApolloServer } from 'apollo-server-micro'
import { GraphQLTestResponse } from '../../@types/utils'
import { SignupMutation, SignupMutationVariables } from '../../graphql'
import SIGNUP_USER from '../../graphql/queries/signupUser'
import { prisma } from '../../prisma'
import { startServer } from '../utils/apolloTestServer'

describe('sign up integration test', () => {
  const signupArgs: SignupMutationVariables = {
    firstName: 'Test',
    lastName: 'Testington',
    username: 'test',
    email: 'test@fake.com'
  }

  let server: ApolloServer
  beforeAll(() => {
    server = startServer()
  })

  afterAll(async () => {
    await server.stop()
    await prisma.$disconnect()
  })

  beforeEach(async () => {
    await prisma.user.deleteMany({ where: { username: signupArgs.username } })
  })

  it('should create new user', async () => {
    const {
      data: { signup }
    } = (await server.executeOperation(
      {
        query: SIGNUP_USER,
        variables: signupArgs
      },
      {
        req: { session: {} }
      }
    )) as GraphQLTestResponse<SignupMutation>
    expect(signup).toMatchObject({
      success: true,
      username: signupArgs.username,
      cliToken: expect.any(String)
    })
    const user = await prisma.user.findFirst({
      where: { username: signupArgs.username }
    })
    expect(user).not.toBeNull()
    expect(user).toMatchObject<User>({
      id: expect.any(Number),
      username: signupArgs.username,
      name: `${signupArgs.firstName} ${signupArgs.lastName}`,
      email: signupArgs.email,
      password: null,
      isAdmin: false,
      forgotToken: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      tokenExpiration: expect.any(Date),
      gsId: null,
      isOnline: null,
      cliToken: null,
      emailVerificationToken: null
    })
  })

  it.each([
    ['email', 'newbie@mail.com'],
    ['username', 'newbie']
  ])(
    'should not create an user if %s = %s already exists',
    async (field: string, value: string) => {
      const { errors } = await server.executeOperation(
        {
          query: SIGNUP_USER,
          variables: { ...signupArgs, [field]: value }
        },
        {
          req: { session: {} }
        }
      )
      expect(errors).not.toBeNull()
      expect(errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            message: expect.stringMatching(/already exists/i)
          })
        ])
      )
    }
  )
})
