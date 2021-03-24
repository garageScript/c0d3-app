jest.mock('../dbload')
import db from '../dbload'
import { userInfo } from './userInfoController'

const { User, UserLesson, Submission, Star } = db
describe('userInfo controller tests', () => {
  test('should return error of invalid username if no username is passed in', async () => {
    await expect(userInfo({}, {})).rejects.toThrow('Invalid username')
  })
  test('should return error if User.findOne returns invalid user object', async () => {
    User.findOne = jest.fn()
    await expect(userInfo({}, { username: 'testing2020' })).rejects.toThrow(
      'Invalid user object'
    )
  })
  test('should return correct submissions and user lesson', async () => {
    User.findOne = jest.fn().mockReturnValue({
      id: '10',
      username: 'noob222',
      email: 'testing2020@gmail.com'
    })
    UserLesson.findAll = jest
      .fn()
      .mockReturnValue([{ id: '1', status: 'passed', lessonId: 1 }])
    Submission.findAll = jest.fn().mockReturnValue([
      {
        id: '1',
        diff: 'testing2020'
      }
    ])
    Star.findAll = jest.fn().mockReturnValue([
      {
        student: {
          id: 2,
          username: 'noob222',
          name: 'fake user'
        },
        lesson: {
          order: '3',
          title: 'Objects'
        },
        dataValues: {
          id: 12,
          lessonId: 1,
          studentId: 2,
          mentorId: 10,
          comment: 'Thank you'
        },
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
              lessonOrder: '3',
              lessonId: 1,
              lessonTitle: 'Objects',
              studentId: 2,
              studentName: 'fake user',
              studentUsername: 'noob222',
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
    User.findOne = jest.fn().mockReturnValue({
      id: '10',
      username: 'noob222',
      email: 'testing2020@gmail.com'
    })
    UserLesson.findAll = jest
      .fn()
      .mockReturnValue([{ id: '1', status: 'passed', lessonId: 1 }])
    Submission.findAll = jest.fn().mockReturnValue([
      {
        id: '1',
        diff: 'testing2020'
      }
    ])
    Star.findAll = jest.fn().mockReturnValue([])
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
