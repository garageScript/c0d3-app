jest.mock('../../helpers/validateLessonId')
jest.mock('../mattermost')
import { setStar } from './starsController'
import { validateLessonId } from '../validateLessonId'
import { getUserByEmail } from '../mattermost'
import { prisma } from '../../prisma'

getUserByEmail.mockReturnValue({ username: 'flam' })

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
    prisma.star.upsert = jest.fn().mockResolvedValue({
      lesson: { chatUrl: 'jim/flam' },
      mentor: { email: 'potatoLove@potatus.com' }
    })
    validateLessonId.mockReturnValue(true)
  })

  test('should throw error if studentId and mentorId is the same', async () => {
    await expect(
      setStar(null, { lessonId: 52226, mentorId: 1337 }, ctx)
    ).rejects.toThrowError('Unable to give star to yourself')
    expect(prisma.star.upsert).not.toBeCalled()
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should return success object if no errors are thrown, and Star.create is called', async () => {
    const res = await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    expect(prisma.star.upsert).toBeCalled()
    expect(res).toEqual({ success: true })
  })

  test('should jump to catch block and call req.error when calling Star.create creates an error', async () => {
    prisma.star.upsert = jest.fn().mockRejectedValueOnce(new Error())
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prisma.star.upsert).toBeCalled()
    expect(ctx.req.error).toHaveBeenCalledTimes(1)
  })

  test('should throw error if lessonId does not exist', async () => {
    validateLessonId.mockRejectedValueOnce(new Error())
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prisma.star.upsert).not.toBeCalled()
  })

  test('should throw error if user is not logged in', async () => {
    ctx.req.user = null
    await expect(
      setStar(null, { lessonId: 5, mentorId: 815 }, ctx)
    ).rejects.toThrowError()
    expect(prisma.star.upsert).not.toBeCalled()
  })

  test('should not send chat message if chatUrl or mentor email are null', async () => {
    prisma.star.upsert = jest.fn().mockResolvedValue({
      lesson: { chatUrl: null },
      mentor: { email: null }
    })
    await setStar(null, { lessonId: 52226, mentorId: 815 }, ctx)
    expect(getUserByEmail).not.toBeCalled()
  })
})
