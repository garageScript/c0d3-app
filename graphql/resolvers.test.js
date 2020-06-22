import resolvers from '../graphql/resolvers'
import db from '../helpers/dbload'
jest.mock('node-fetch')
jest.mock('mailgun-js')

const { Query } = resolvers
const { User, Submission, UserLesson } = db

describe('GraphQL resolvers', () => {
  const { Lesson, Submission } = db
  let user, args

  beforeEach(() => {
    jest.clearAllMocks()

    args = { cliToken: 'fakeCliToken' }
    user = {
      username: 'fakeUser',
      password: 'fakePassword',
      cliToken: 'fakeCliToken',
      update: () => Promise.resolve((user.cliToken = 'newCliToken'))
    }
  })

  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(Query.lessons()).toEqual([])
  })
  test('should return no submissions if there are none open', async () => {
    Submission.findAll = jest.fn().mockReturnValue([])
    const result = await resolvers.Query.submissions(null, { lessonId: '2' })
    expect(result).toEqual([])
  })
  test('should return submissions with a given lessonId', async () => {
    const user = { id: 1, username: 'Michael' }
    const submissionResults = {
      id: 5,
      user,
      diff:
        'diff --git a/js1/12.js b/js1/12.js↵index e7dc26e..d0cdf56 100644↵--- a/js1/12.js↵+++ b/js1/12.js↵@@ -9,8 +9,17 @@↵  * @returns null↵  */↵ ↵-const solution = (a, fun) => {↵+const solution = (a, fun,i =0) => {↵+↵+  if(i < 2){↵+    setTimeout(()=> {↵+      b = fun()↵+      return solution(b,fun, i +1)↵+    }, a)↵+    ↵ }↵+   ↵+  }↵ ↵ module.exports = {↵   solution↵',
      comment: '',
      createdAt: '1586386486986',
      challengeId: '200'
    }
    Submission.findAll = jest.fn().mockResolvedValue([submissionResults])
    const result = await resolvers.Query.submissions(
      null,
      { lessonId: '2' },
      { req: { error: jest.fn() } }
    )
    expect(result).toEqual([submissionResults])
  })
})

describe('Session resolver', () => {
  let req

  beforeEach(() => {
    jest.clearAllMocks()

    req = { session: { userId: 2 } }
  })

  test('should return null if no userId', async () => {
    req.session = null
    expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user null if no user found', async () => {
    User.findOne = jest.fn().mockReturnValue(null)
    Submission.findAll = jest.fn().mockReturnValue(null)
    UserLesson.findAll = jest.fn().mockReturnValue(null)

    expect(await resolvers.Query.session({}, {}, { req })).toEqual(null)
  })

  test('should return user including submissions and lessonStatus', async () => {
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

describe('Alerts resolvers', () => {
  const { Alert } = db
  test('should return empty array if no alerts', async () => {
    Alert.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.alerts()).toEqual([])
  })

  test('should return list of alerts', async () => {
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
