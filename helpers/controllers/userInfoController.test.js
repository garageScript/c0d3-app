import { SubmissionStatus } from '../../graphql'
import prismaMock from '../../__tests__/utils/prismaMock'
import { userInfo } from './userInfoController'

const getUserInfoFromRefreshToken = jest.fn()

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

describe('userInfo controller tests', () => {
  test('should return error of invalid username if no username is passed in', () => {
    expect(userInfo({}, {})).rejects.toThrow('Invalid username')
  })
  test('should return error if prisma.user.findFirst returns invalid user object', () => {
    expect(userInfo({}, { username: 'testing2020' })).rejects.toThrow(
      'Invalid user object'
    )
  })
  test('should not call getUserInfoFromRefreshToken if user has no refresh token', async () => {
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([star])
    await userInfo({}, { username: 'testing2020' })
    expect(getUserInfoFromRefreshToken.mock.calls.length).toBe(0)
  })
  test('should return correct submissions and user lesson', async () => {
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([star])
    getUserInfoFromRefreshToken.mockReturnValueOnce({
      username: 'fakeDiscordUser',
      avatarUrl: 'fakeUrl'
    })
    const returnValue = await userInfo(
      {},
      { username: user.username, discordRefreshToken: 'validToken' }
    )
    expect(returnValue).toEqual({
      user: {
        ...user,
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
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([])
    const returnValue = await userInfo(
      {},
      { username: user.username, discordRefreshToken: 'validToken' }
    )
    expect(returnValue).toEqual({
      user: {
        ...user,
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
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([])
    getUserInfoFromRefreshToken.mockImplementation(() => {
      throw new Error('refresh token invalid for userId 123')
    })
    const returnValue = await userInfo({}, { username: user.username })
    expect(returnValue).toEqual({
      user: {
        ...user,
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
