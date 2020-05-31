import resolvers from '../graphql/resolvers'
import db from '../helpers/dbload'

describe('GraphQL resolvers', () => {
  const { Lesson, Submission, Alert } = db
  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.lessons()).toEqual([])
  })
  test('should return submissions with a given lessonId', async () => {
    Submission.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.submissions(null, { lessonId: '2' })).toEqual([])
  })

  test('should return empty array if no alerts', async () => {
    Alert.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.alerts()).toEqual([])
  })

  test('should return list of announcements', async () => {
    Alert.findAll = jest.fn().mockReturnValue([
      {
        id: 0,
        text: 'Set up your computer to submit challenges.',
        url:
          'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
        urlCaption: 'View Instructions'
      },
      {
        id: 1,
        text: 'Please upgrade your CLI client by running npm update c0d3'
      }
    ])
    expect(resolvers.Query.alerts()).toEqual([
      {
        id: 0,
        text: 'Set up your computer to submit challenges.',
        url:
          'https://www.notion.so/JS-0-Foundations-a43ca620e54945b2b620bcda5f3cf672#b45ed85a95e24c9d9fb784afb7a46bcc',
        urlCaption: 'View Instructions'
      },
      {
        id: 1,
        text: 'Please upgrade your CLI client by running npm update c0d3'
      }
    ])
  })
})

describe('Session resolver', () => {
  test('should return null if no userId', async () => {
    const req = { session: null }

    return expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user null if no user found', async () => {
    const { User, Submission, UserLesson } = db
    const req = { session: { userId: 2 } }
    User.findOne = jest.fn().mockReturnValue(null)
    Submission.findAll = jest.fn().mockReturnValue(null)
    UserLesson.findAll = jest.fn().mockReturnValue(null)

    return expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user including submissions and lessonStatus', async () => {
    const { User, Submission, UserLesson } = db
    const req = { session: { userId: 2 } }

    const result = {
      user: { username: 'test' },
      submissions: [{ id: '1' }],
      lessonStatus: [{ id: '1' }]
    }

    User.findOne = jest.fn().mockReturnValue(result.user)
    Submission.findAll = jest.fn().mockReturnValue(result.submissions)
    UserLesson.findAll = jest.fn().mockReturnValue(result.lessonStatus)

    const returnValue = await resolvers.Query.session({}, {}, { req })

    expect(returnValue.user).toEqual(result.user)
    expect(returnValue.submissions).toEqual(result.submissions)
    expect(returnValue.lessonStatus).toEqual(result.lessonStatus)
  })
})
