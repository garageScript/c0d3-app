jest.mock('../../helpers/dbload')
import { addStar } from './addStar'
import db from '../../helpers/dbload'

const { Star } = db
const ctx = { req: { error: jest.fn() } }

describe('addStar resolver', () => {
  beforeEach(jest.clearAllMocks)

  test('should return success object if no errors are thrown, and Star.create is called', async () => {
    const res = await addStar(
      null,
      { lessonId: 5, studentId: 2226, mentorId: 815 },
      ctx
    )
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(res).toEqual({ success: true })
  })

  test('should jump to catch block and call req.error when calling Star.create creates an error', async () => {
    Star.create = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    try {
      await addStar(null, { lessonId: 5, studentId: 2226, mentorId: 815 }, ctx)
    } catch {}
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should throw "Missing or invalid studentId" error if studentId is missing', async () => {
    let res = 'Never gonna give'
    try {
      await addStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid studentId')
  })

  test('should throw "Missing or invalid studentId" error if studentId is invalid', async () => {
    let res = 'you up. Never'
    try {
      await addStar(null, { lessonId: 5, studentId: 0, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid studentId')
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is missing', async () => {
    let res = 'gonna let you'
    try {
      await addStar(null, { studentId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid lessonId')
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is invalid', async () => {
    let res = 'down. Never gonna'
    try {
      await addStar(null, { lessonId: 0, studentId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid lessonId')
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is missing', async () => {
    let res = 'run around'
    try {
      await addStar(null, { studentId: 5, lessonId: 5 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid mentorId')
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is invalid', async () => {
    let res = 'and desert you'
    try {
      await addStar(null, { lessonId: 5, studentId: 5, mentorId: 0 }, ctx)
    } catch (err) {
      res = String(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    expect(res).toContain('Missing or invalid mentorId')
  })
})
