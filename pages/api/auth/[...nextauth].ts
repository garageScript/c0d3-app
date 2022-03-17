import NextAuth from 'next-auth'
import { NextApiResponse } from 'next'
import { LoggedRequest } from '../../../@types/helpers'
import { Request, Response } from 'express'
import { signIn, providers } from '../../../helpers/nextAuth'

export default (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) =>
  NextAuth(req, res, {
    providers,
    callbacks: {
      signIn: signIn(req, res)
    },
    secret: process.env.SESSION_SECRET
  })
