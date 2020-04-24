import resolvers from '../graphql/resolvers'
import db from '../helpers/dbload'

describe('GraphQL resolvers', () => {
  const { Lesson } = db
  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.lessons()).toEqual([])
  })

  test('session should return null if no userId', async () => {
    const req = { session: null }

    return expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('session should return user null if no user found', async () => {
    const { User } = db
    const req = { session: { userId: 2 } }
    User.findOne = jest.fn().mockReturnValue(null)

    return expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('session should return user including submissions and lessonStatus', async () => {
    const { User } = db
    const req = { session: { userId: 2 } }

    const userResult = {
      user: { username: 'test' },
      Submissions: [{ id: '1' }],
      UserLessons: [{ id: '1' }]
    }

    User.findOne = jest.fn().mockReturnValue(userResult)

    const expectedReturnValue = {
      user: { username: 'test' },
      submissions: [{ id: '1' }],
      lessonStatus: [{ id: '1' }]
    }

    const returnValue = await resolvers.Query.session({}, {}, { req })

    expect(returnValue.user).toEqual(userResult)
    expect(returnValue.submissions).toEqual(expectedReturnValue.submissions)
    expect(returnValue.lessonStatus).toEqual(expectedReturnValue.lessonStatus)
  })
})
