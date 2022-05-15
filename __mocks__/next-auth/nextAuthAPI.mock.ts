import { ReactChildren } from 'react'
import { SubmissionStatus } from '../../graphql'
import dummySessionData from '../../__dummy__/sessionData'

const mockSessionProvider = jest
  .fn()
  .mockImplementation(({ children }: { children: ReactChildren }) => children)
const mockSignOut = jest.fn()
const mockSignIn = jest.fn()
const useSessionReturn = {
  data: {
    ...dummySessionData,
    submissions: [
      {
        id: 1,
        status: SubmissionStatus.Passed,
        mrUrl: '',
        diff: '',
        viewCount: 0,
        comment: '',
        order: 0,
        challengeId: 146,
        lessonId: 2,
        reviewer: {
          id: 1,
          username: 'fake reviewer'
        },
        createdAt: '123',
        updatedAt: '123',
        comments: null,
        user: {
          id: 1
        }
      },
      {
        id: 2,
        status: SubmissionStatus.Passed,
        mrUrl: '',
        diff: '',
        viewCount: 0,
        comment: '',
        order: 0,
        challengeId: 145,
        lessonId: 2,
        reviewer: {
          id: 1,
          username: 'fake reviewer'
        },
        createdAt: '123',
        updatedAt: '123',
        comments: null,
        user: {
          id: 1
        }
      }
    ],
    lessonStatus: [
      {
        lessonId: 5,
        passedAt: new Date(),
        starGiven: null,
        starsReceived: [
          {
            id: 17,
            mentorId: 1,
            studentId: 6,
            lessonId: 5,
            student: {
              username: 'newbie',
              name: 'newbie newbie'
            },
            lesson: {
              title: 'Foundations of JavaScript',
              order: 1
            },
            comment: 'Thanks for your halp!'
          }
        ]
      },
      {
        lessonId: 2,
        passedAt: new Date(),
        starGiven: null,
        starsReceived: [
          {
            id: 17,
            mentorId: 1,
            studentId: 6,
            lessonId: 2,
            student: {
              username: 'newbie',
              name: 'newbie newbie'
            },
            lesson: {
              title: 'Variables & Functions',
              order: 1
            },
            comment: 'Thanks for your halp!'
          }
        ]
      },
      {
        lessonId: 1,
        passedAt: new Date(),
        starGiven: null,
        starsReceived: [
          {
            id: 17,
            mentorId: 1,
            studentId: 6,
            lessonId: 2,
            student: {
              username: 'anonymous',
              name: ''
            },
            lesson: {
              title: 'Variables & Functions',
              order: 1
            },
            comment: ''
          }
        ]
      }
    ]
  },
  status: 'authenticated'
}

export const mockUseSession = jest.fn().mockReturnValue(useSessionReturn)
const mockGetSession = jest.fn().mockReturnValue(useSessionReturn)

jest.mock('next-auth/react', () => ({
  __esModule: true,
  signOut: mockSignOut,
  signIn: mockSignIn,
  SessionProvider: mockSessionProvider,
  useSession: mockUseSession,
  getSession: mockGetSession
}))
