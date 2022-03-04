import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
// import DiscordProvider from 'next-auth/providers/discord'

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      // Commented to describe what provider it'll have.
      // DiscordProvider({
      //   clientId: process.env.DISCORD_CLIENT_ID,
      //   clientSecret: process.env.DISCORD_CLIENT_SECRET
      // })
    ]
  })
