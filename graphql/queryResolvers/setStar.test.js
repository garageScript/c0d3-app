jest.mock('../../helpers/dbload')
import { setStar } from './setStar'
import db from '../../helpers/dbload'

const { Star } = db
const ctx = {
  req: {
    error: jest.fn(),
    user: { id: 1337 }
  }
}
Star.findAll = jest.fn().mockReturnValue([])

describe('setStar resolver', () => {
  beforeEach(jest.clearAllMocks)

  test('should return success object if no errors are thrown, and Star.create is called', async () => {
    const res = await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(res).toEqual({ success: true })
  })

  test('should jump to catch block and call req.error when calling Star.create creates an error', async () => {
    Star.create = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    try {
      await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    } catch {}
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is missing', async () => {
    let res = 'Never gonna'
    try {
      await setStar(null, { mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid lessonId')
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is invalid', async () => {
    let res = 'give you up'
    try {
      await setStar(null, { lessonId: 0, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid lessonId')
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is missing', async () => {
    let res = 'Never gonna'
    try {
      await setStar(null, { lessonId: 5 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid mentorId')
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is invalid', async () => {
    let res = 'let you down'
    try {
      await setStar(null, { lessonId: 5, mentorId: 0 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid mentorId')
  })

  test('should call Star.destroy when relationship between studentId and lessonId \
   has already been made inside the Stars table of the database', async () => {
    let res = 'Never gonna'
    Star.findAll = jest.fn().mockReturnValue(['Potatus Maximus'])
    try {
      await setStar(null, { lessonId: 5, mentorId: 5 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.destroy).toHaveBeenCalledTimes(1)
    expect(Star.create).toHaveBeenCalledTimes(1)
  })

  test('should throw "Student is not logged in" error if user is not logged in', async () => {
    let res = 'run around and desert you'
    ctx.req.user = null
    try {
      await setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Student is not logged in')
  })
})
