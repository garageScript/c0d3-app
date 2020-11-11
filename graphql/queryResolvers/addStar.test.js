jest.mock('../../helpers/dbload')
import { addStar } from './addStar'
import db from '../../helpers/dbload'

const { Star } = db
const ctx = { req: { error: jest.fn() } }

describe('Alerts resolver', () => {
  beforeEach(jest.clearAllMocks)

  test('should return success if no errors are thrown, and Star.create is called', async () => {
    const res = await addStar(
      null,
      { lessonId: 5, studentId: 2226, mentorId: 815 },
      ctx
    )
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(res).toEqual({ success: true })
  })

  test('should throw "Failed to add star into database" if calling Star.create creates an error', async () => {
    let res = 'potato'
    Star.create = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    try {
      await addStar(null, { lessonId: 5, studentId: 2226, mentorId: 815 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(1)
    const bool = res.includes('Failed to add Star into database')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid studentId" error if studentId is missing', async () => {
    let res = 'potato'
    try {
      await addStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid studentId')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid studentId" error if studentId is invalid', async () => {
    let res = 'potato'
    try {
      await addStar(null, { lessonId: 5, studentId: 0, mentorId: 815 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid studentId')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is missing', async () => {
    let res = 'potato'
    try {
      await addStar(null, { studentId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid lessonId')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid lessonId" error if lessonId is invalid', async () => {
    let res = 'potato'
    try {
      await addStar(null, { lessonId: 0, studentId: 5, mentorId: 815 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid lessonId')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is missing', async () => {
    let res = 'potato'
    try {
      await addStar(null, { studentId: 5, lessonId: 5 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid mentorId')
    expect(bool).toBeTruthy
  })

  test('should throw "Missing or invalid mentorId" error if mentorId is invalid', async () => {
    let res = 'potato'
    try {
      await addStar(null, { lessonId: 5, studentId: 5, mentorId: 0 }, ctx)
    } catch (err) {
      res = JSON.stringify(err)
    }
    expect(Star.create).toHaveBeenCalledTimes(0)
    const bool = res.includes('Missing or invalid mentorId')
    expect(bool).toBeTruthy
  })
})
