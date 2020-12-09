jest.mock('../../helpers/dbload')
jest.mock('../../helpers/lessonExists')
import { setStar } from './setStar'
import { lessonExists } from '../../helpers/lessonExists'
import db from '../../helpers/dbload'

const { Star } = db
const ctx = {
  req: {
    error: jest.fn(),
    user: { id: 1337 }
  }
}
describe('setStar resolver', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    lessonExists.mockReturnValue(true)
    Star.findAll = jest.fn().mockReturnValue([])
    Star.create = jest.fn().mockReturnValue({ success: true })
  })

  test('should return success object if no errors are thrown, and Star.create is called', async () => {
    const res = await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(res).toEqual({ success: true })
  })

  test('should jump to catch block and call req.error when calling Star.create creates an error', async () => {
    Star.create = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(Star.create).toHaveBeenCalledTimes(1)
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should call Star.destroy when relationship between studentId and lessonId \
   has already been made inside the Stars table of the database', async () => {
    Star.findAll = jest.fn().mockReturnValue(['Potatus Maximus'])
    await setStar(null, { lessonId: 5, mentorId: 5 }, ctx)
    expect(Star.destroy).toHaveBeenCalledTimes(1)
    expect(Star.create).toHaveBeenCalledTimes(1)
  })

  test('should throw "lessonId does not exist in database" error if user is not logged in', async () => {
    lessonExists.mockReturnValue(false)
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError('lessonId does not exist in database')
    expect(Star.create).toHaveBeenCalledTimes(0)
  })

  test('should throw "Student is not logged in" error if user is not logged in', async () => {
    ctx.req.user = null
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError('Student is not logged in')
    expect(Star.create).toHaveBeenCalledTimes(0)
  })
})
