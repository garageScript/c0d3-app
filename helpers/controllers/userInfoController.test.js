import { prisma } from '../../prisma'
import { userInfo } from './userInfoController'

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
    prisma.user.findFirst = jest.fn().mockReturnValue({
      id: '10',
      username: 'noob222',
      email: 'testing2020@gmail.com'
    })
    prisma.userLesson.findMany = jest
      .fn()
      .mockReturnValue([{ id: '1', status: 'passed', lessonId: 1 }])
    prisma.submission.findMany = jest.fn().mockReturnValue([
      {
        id: '1',
        diff: 'testing2020'
      }
    ])
    prisma.star.findMany = jest.fn().mockReturnValue([
      {
        id: 12,
        lessonId: 1,
        studentId: 2,
        mentorId: 10,
        comment: 'Thank you',
        lessonId: 1
      }
    ])
    const returnValue = await userInfo({}, { username: 'noob222' })
    expect(returnValue).toEqual({
      user: {
        id: '10',
        username: 'noob222',
        email: 'testing2020@gmail.com'
      },
      lessonStatus: [
        {
          id: '1',
          status: 'passed',
          lessonId: 1,
          starsReceived: [
            {
              id: 12,
              lessonId: 1,
              studentId: 2,
              mentorId: 10,
              comment: 'Thank you'
            }
          ]
        }
      ],
      submissions: [
        {
          id: '1',
          diff: 'testing2020'
        }
      ]
    })
  })
  test('Should return empty Stars array if no Stars are given', async () => {
    prisma.user.findFirst = jest.fn().mockReturnValue({
      id: '10',
      username: 'noob222',
      email: 'testing2020@gmail.com'
    })
    prisma.userLesson.findMany = jest
      .fn()
      .mockReturnValue([{ id: '1', status: 'passed', lessonId: 1 }])
    prisma.submission.findMany = jest.fn().mockReturnValue([
      {
        id: '1',
        diff: 'testing2020'
      }
    ])
    prisma.star.findMany = jest.fn().mockReturnValue([])
    const returnValue = await userInfo({}, { username: 'noob222' })
    expect(returnValue).toEqual({
      user: {
        id: '10',
        username: 'noob222',
        email: 'testing2020@gmail.com'
      },
      lessonStatus: [
        {
          id: '1',
          status: 'passed',
          lessonId: 1,
          starsReceived: []
        }
      ],
      submissions: [
        {
          id: '1',
          diff: 'testing2020'
        }
      ]
    })
  })
})
