import { Submission } from '@prisma/client'
import { DefaultSession } from 'next-auth'
import { SessionStatus } from './auth'

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
          status: SessionStatus.Authenticated
        }
      | {
          data: null
          status: SessionStatus.Loading
        }
  :
      | {
          data: Session
          status: SessionStatus.Authenticated
        }
      | {
          data: null
          status: SessionStatus.Unauthenticated | SessionStatus.Loading
        }
