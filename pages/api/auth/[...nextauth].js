import NextAuth from 'next-auth'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '../../../prisma/index'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('USER', user)
      console.log('ACCOUNT', account)
      console.log('Profile', profile)
      console.log('EMAIL', email)
      console.log('CREDENTIALS', credentials)
      return true
    }
  },

  adapter: PrismaAdapter(prisma),
  debug: true
})
