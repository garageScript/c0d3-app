import { Submission } from '@prisma/client'
import { DefaultSession } from 'next-auth'
import { SessionContextValue } from 'next-auth/react'

type SignInReturn = {
  error: string
  ok: boolean
  status: number
  url: string
}

export interface Session extends DefaultSession {
  lessonStatus: {
    starGiven: string
    passedAt: Date | null
    lessonId: number
  }[]
  user: {
    id: number
    username: string
    name: string
    isAdmin: boolean
    isConnectedToDiscord: boolean
  }
  submissions: Submission[]
}

export declare type SessionContext<R extends boolean = false> = R extends true
  ?
      | {
          data: Session
          status: 'authenticated'
        }
      | {
          data: null
          status: 'loading'
        }
  :
      | {
          data: Session
          status: 'authenticated'
        }
      | {
          data: null
          status: 'unauthenticated' | 'loading'
        }
