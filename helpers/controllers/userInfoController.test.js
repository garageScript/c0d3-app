import { SubmissionStatus } from '../../graphql'
import prismaMock from '../../__tests__/utils/prismaMock'
import { userInfo } from './userInfoController'

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
  test('should return correct submissions and user lesson', async () => {
    prismaMock.user.findFirst.mockResolvedValue(user)
    prismaMock.userLesson.findMany.mockResolvedValue([userLesson])
    prismaMock.submission.findMany.mockResolvedValue([submission])
    prismaMock.star.findMany.mockResolvedValue([star])
    const returnValue = await userInfo({}, { username: user.username })
    expect(returnValue).toEqual({
      user,
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
    const returnValue = await userInfo({}, { username: user.username })
    expect(returnValue).toEqual({
      user,
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
