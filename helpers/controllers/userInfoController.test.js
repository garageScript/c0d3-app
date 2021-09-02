jest.mock('../discordAuth')
import { SubmissionStatus } from '../../graphql'
import prismaMock from '../../__tests__/utils/prismaMock'
import { userInfo } from './userInfoController'
import { getUserInfoFromRefreshToken } from '../discordAuth'

const user = {
  id: '10',
  username: 'noob222',
  email: 'testing2020@gmail.com'
}

const userLesson = { id: '1', status: SubmissionStatus.Passed, lessonId: 1 }

const submission = {
  id: '1',
  diff: 'testing2020'
}

const star = {
  id: 12,
  lessonId: 1,
  studentId: 2,
  mentorId: 10,
  comment: 'Thank you',
  lessonId: 1
}

const mockCtx = { req: { error: err => err } }

describe('userInfo controller tests', () => {
  test('should return error of invalid username if no username is passed in', () => {
    expect(userInfo({}, {}, mockCtx)).rejects.toThrow('Invalid username')
  })
  test('should return error if prisma.user.findFirst returns invalid user object', () => {
    expect(userInfo({}, { username: 'testing2020' }, mockCtx)).rejects.toThrow(
      'Invalid user object'
    )
  })
  test('should not call getUserInfoFromRefreshToken if user has no refresh token', async () => {
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([star])
    await userInfo({}, { username: 'testing2020' }, mockCtx)
    expect(getUserInfoFromRefreshToken.mock.calls.length).toBe(0)
  })
  test('should return correct user info, submissions and user lesson', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...user,
      discordRefreshToken: 'validToken'
    })
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([star])
    getUserInfoFromRefreshToken.mockResolvedValue({
      userId: 'fakeId',
      username: 'fakeDiscordUser',
      avatarUrl: 'fakeUrl'
    })
    const returnValue = await userInfo({}, { username: user.username }, mockCtx)
    expect(returnValue).toEqual({
      user: {
        ...user,
        discordRefreshToken: 'validToken',
        discordUserId: 'fakeId',
        discordUsername: 'fakeDiscordUser',
        discordAvatarUrl: 'fakeUrl'
      },
      lessonStatus: [
        {
          ...userLesson,
          starsReceived: [star]
        }
      ],
      submissions: [submission]
    })
  })
  test('Should return empty Stars array if no Stars are given', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...user,
      discordRefreshToken: 'validToken'
    })
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([])
    const returnValue = await userInfo(
      {},
      { username: user.username, discordRefreshToken: 'validToken' },
      mockCtx
    )
    expect(returnValue).toEqual({
      user: {
        ...user,
        discordRefreshToken: 'validToken',
        discordUserId: 'fakeId',
        discordUsername: 'fakeDiscordUser',
        discordAvatarUrl: 'fakeUrl'
      },
      lessonStatus: [
        {
          ...userLesson,
          starsReceived: []
        }
      ],
      submissions: [submission]
    })
  })
  test('should return empty values for discord username and avatar url if refresh token invalid', async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...user,
      discordRefreshToken: 'invalidToken'
    })
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([])
    getUserInfoFromRefreshToken.mockImplementation(() => {
      throw new Error('refresh token invalid for userId 123')
    })
    const returnValue = await userInfo({}, { username: user.username }, mockCtx)
    expect(returnValue).toEqual({
      user: {
        ...user,
        discordRefreshToken: 'invalidToken',
        discordUserId: '',
        discordUsername: '',
        discordAvatarUrl: ''
      },
      lessonStatus: [
        {
          ...userLesson,
          starsReceived: []
        }
      ],
      submissions: [submission]
    })
  })
})
