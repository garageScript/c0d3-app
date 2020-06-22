jest.mock('../dbload')
import db from '../dbload'
import { userInfo } from './userInfoController'

const { User, UserLesson, Submission } = db
describe('userInfo controller tests', () => {
  test('should return error of invalid username if no username is passed in', async () => {
    expect(userInfo({}, {})).rejects.toEqual('Invalid username')
  })
  test('should return error if User.findOne returns invalid user object', async () => {
    User.findOne = jest.fn()
    expect(userInfo({}, { username: 'testing2020' })).rejects.toEqual(
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
      .mockReturnValue([{ id: '1', status: 'passed' }])
    Submission.findAll = jest.fn().mockReturnValue([
      {
        id: '1',
        diff: 'testing2020'
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
          status: 'passed'
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
