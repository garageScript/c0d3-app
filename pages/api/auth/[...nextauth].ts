import { NextApiResponse } from 'next'
import NextAuth, { User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import DiscordProvider from 'next-auth/providers/discord'
import { login, signup } from '../../../helpers/controllers/authController'
import { Context, LoggedRequest } from '../../../@types/helpers'
import { PrismaClient } from '@prisma/client'
import { session } from '../../../graphql/queryResolvers/session'
import { getSession } from 'next-auth/react'
import { Session } from '../../../@types/auth'
import { URL } from 'url'
import { updateRefreshandAccessTokens } from '../../../helpers/discordAuth'

const prisma = new PrismaClient()

const populateUser = async (
  user: { id: number },
  req: LoggedRequest,
  context: Context
) => {
  const userData = await prisma.user.findUnique({
    where: { id: user.id }
  })

  req.user = userData
  const userSession = await session(undefined, undefined, context)

  return {
    ...userSession,
    user: {
      id: userSession.user!.id,
      username: userSession.user?.username,
      name: userSession.user!.name,
      isAdmin: userSession.user?.isAdmin,
      isConnectedToDiscord: userSession.user?.isConnectedToDiscord,
      createdAt: userSession.user?.createdAt
    }
  }
}

export default (req: LoggedRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          username: {
            label: 'Username',
            type: 'text',
            placeholder: 'Username'
          },
          password: {
            label: 'Password',
            type: 'password',
            placeholder: 'Password'
          },
          email: {
            label: 'Email',
            type: 'text',
            placeholder: 'Email'
          },
          firstName: {
            label: 'FirstName',
            type: 'text',
            placeholder: 'First name'
          },
          lastName: {
            label: 'LastName',
            type: 'text',
            placeholder: 'Last name'
          }
        },
        async authorize(credentials) {
          try {
            const context = { req, res } as Context

            const email = credentials?.email
            const firstName = credentials?.firstName
            const lastName = credentials?.lastName
            const username = credentials?.username
            const password = credentials?.password

            const isSignupFlow = firstName && lastName && email && username
            const isLoginFlow = username && password

            if (isSignupFlow) {
              const user = await signup(
                undefined,
                { email, lastName, firstName, username },
                context
              )

              if (user) {
                return await populateUser(user, req, context)
              }
            }

            if (isLoginFlow) {
              const user = await login(
                undefined,
                { username, password },
                context
              )

              if (user) {
                return await populateUser(user, req, context)
              }
            }

            return null
          } catch (e) {
            console.log(e)
            throw new Error(e as string)
          }
        }
      }),
      DiscordProvider({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET
      })
    ],
    callbacks: {
      async signIn({ account, user }) {
        const { provider } = account

        if (provider === 'discord') {
          const session = (await getSession({ req })) as Session
          const { access_token, expires_at, refresh_token } = account

          // Connect to discord
          if (session?.user) {
            await updateRefreshandAccessTokens(
              session.user.id,
              user.id,
              refresh_token!,
              access_token!,
              new Date(expires_at! * 1000)
            )

            // Cancel auth flow. Session won't be created
            return '/discord/success'
          }

          // Sign-in to discord
          const userInfo = await prisma.user.findFirst({
            where: {
              discordId: user.id
            }
          })

          if (userInfo) return true
          return '/discord/user404'
        }

        return true
      },
      async session({ session, token }) {
        const context = { req, res } as Context
        const callbackUrl = new URL(req.cookies['next-auth.callback-url'])
        let user = token.user as object

        // /curriculum means it's sign-in to discord request
        if (callbackUrl.pathname === '/curriculum') {
          const userData = await prisma.user.findFirst({
            where: {
              discordId: token.sub
            }
          })

          user = await populateUser({ id: userData?.id! }, req, context)
        }

        session = { ...session, ...user }
        return session
      },
      async jwt({ token, user }) {
        if (user) {
          token.user = user
        }
        return token
      }
    }
    // debug: true
  })
