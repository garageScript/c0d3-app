import NextAuth from 'next-auth'
import { NextApiResponse } from 'next'
import { LoggedRequest } from '../../../@types/helpers'
import { Request, Response } from 'express'
import { signIn, providers, jwt, session } from '../../../helpers/nextAuth'

export default (
  req: LoggedRequest & Request,
  res: NextApiResponse & Response
) =>
  NextAuth(req, res, {
    providers: providers(req, res),
    callbacks: {
      signIn: signIn(req, res),
      jwt,
      session
    },
    pages: {
      signIn: '/login'
    }
  })
