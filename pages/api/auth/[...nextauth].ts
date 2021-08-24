import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import prisma from '../../../prisma'

export default NextAuth({
  providers: [
    Providers.Discord({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      scope: 'identify email'
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      },
      from: 'C0D3 <admin@c0d3.com>'
    })
  ],

  pages: {
    newUser: '/session' // New users will be directed here on first sign in
  },

  callbacks: {
    async signIn(user, _account, profile) {
      // Discord's profile object has an `image_url` key
      const image =
        'image_url' in profile ? (profile.image_url as string) : profile.image
      if (
        typeof user.id === 'number' && // check if it's existing user
        typeof image === 'string' &&
        image !== user.image
      ) {
        console.log('---------- UPDATING USER IMAGE ----------')
        await prisma.user.update({
          where: { id: user.id },
          data: { image }
        })
      }
      return '/session' // Redirect after succesful login
    }
  },

  // A database is optional, but required to persist accounts in a database
  adapter: PrismaAdapter(prisma),
  debug: process.env.NODE_ENV !== 'production'
})
