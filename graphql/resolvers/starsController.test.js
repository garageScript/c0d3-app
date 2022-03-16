/**
 * @jest-environment node
 */

jest.mock('../../helpers/validation/validateLessonId')
jest.mock('../../helpers/discordBot')
import prismaMock from '../../__tests__/utils/prismaMock'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { setStar } from './starsController'

describe('setStar resolver', () => {
  let ctx
  beforeEach(() => {
    jest.clearAllMocks()
    ctx = {
      req: {
        error: jest.fn(),
        user: { id: 1337 }
      }
    }
    prismaMock.star.upsert.mockResolvedValue({
      lesson: { chatUrl: 'jim/flam' },
      mentor: { email: 'potatoLove@potatus.com' }
    })
    validateLessonId.mockReturnValue(true)
  })

  test('should throw error if studentId and mentorId is the same', async () => {
    await expect(
      setStar(null, { lessonId: 52226, mentorId: 1337 }, ctx)
    ).rejects.toThrowError('Unable to give star to yourself')
    expect(prismaMock.star.upsert).not.toBeCalled()
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should return success object if no errors are thrown, and Star.create is called', async () => {
    const res = await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    expect(prismaMock.star.upsert).toBeCalled()
    expect(res).toEqual({ success: true })
  })

  test('should jump to catch block and call req.error when calling Star.create creates an error', async () => {
    prismaMock.star.upsert.mockRejectedValueOnce(new Error())
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prismaMock.star.upsert).toBeCalled()
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should throw error if lessonId does not exist', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prismaMock.star.upsert).not.toBeCalled()
  })

  test('should throw error if user is not logged in', async () => {
    ctx.req.user = null
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prismaMock.star.upsert).not.toBeCalled()
  })
})
