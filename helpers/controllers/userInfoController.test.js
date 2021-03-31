import { prisma } from '../../prisma'
import { userInfo } from './userInfoController'

const user = {
  id: '10',
  username: 'noob222',
  email: 'testing2020@gmail.com'
}

const userLesson = { id: '1', status: 'passed', lessonId: 1 }

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
    prisma.user.findFirst = jest.fn()
    expect(userInfo({}, { username: 'testing2020' })).rejects.toThrow(
      'Invalid user object'
    )
  })
  test('should return correct submissions and user lesson', async () => {
    prisma.user.findFirst = jest.fn().mockReturnValue(user)
    prisma.userLesson.findMany = jest.fn().mockReturnValue([userLesson])
    prisma.submission.findMany = jest.fn().mockReturnValue([submission])
    prisma.star.findMany = jest
      .fn()
      .mockReturnValue([star, { id: 1 /* test empty lessonId case */ }])
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
    prisma.user.findFirst = jest.fn().mockReturnValue(user)
    prisma.userLesson.findMany = jest.fn().mockReturnValue([userLesson])
    prisma.submission.findMany = jest.fn().mockReturnValue([submission])
    prisma.star.findMany = jest.fn().mockReturnValue([])
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
