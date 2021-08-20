/**
 * @jest-environment node
 */

jest.mock('../../helpers/validation/validateLessonId')
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import prismaMock from '../../__tests__/utils/prismaMock'
import { getLessonMentors } from './getLessonMentors'
describe('getLessonMentors resolver', () => {
  beforeEach(() => {
    validateLessonId.mockResolvedValue(true)
  })

  test('should return an array of User objects', async () => {
    const users = [
      { username: 'user1', name: 'lol', id: 2 },
      {
        username: 'user2',
        name: 'potato',
        id: 240
      }
    ]
    prismaMock.user.findMany.mockResolvedValue(users)
    const res = await getLessonMentors(null, { lessonId: 3 }, { req: {} })
    expect(res).toEqual(users)
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      select: {
        username: true,
        name: true,
        id: true
      },
      where: {
        id: { not: undefined },
        userLessons: {
          some: {
            lessonId: 3,
            passedAt: { not: null }
          }
        }
      },
      orderBy: {
        username: 'asc'
      }
    })
  })

  test('Should throw error if lessonId does not exist \
  in database when updating lesson', () => {
    validateLessonId.mockRejectedValue(new Error())
    return expect(
      getLessonMentors(null, { lessonId: 3 }, { req: {} })
    ).rejects.toThrowError()
  })

  test('should throw an error', () => {
    prismaMock.user.findMany.mockRejectedValue(new Error())
    return expect(
      getLessonMentors(null, { lessonId: 3 }, { req: {} })
    ).rejects.toThrow()
  })

  test('should include userId in the query if session exists', async () => {
    prismaMock.user.findMany.mockResolvedValue([
      { username: 'user1', name: 'lol', id: 2 }
    ])
    const res = await getLessonMentors(
      null,
      { lessonId: 3 },
      { req: { user: { id: 1 } } }
    )
    expect(res).toEqual([{ username: 'user1', name: 'lol', id: 2 }])
    expect(prismaMock.user.findMany).toHaveBeenCalledWith({
      select: {
        username: true,
        name: true,
        id: true
      },
      where: {
        id: { not: 1 },
        userLessons: {
          some: {
            lessonId: 3,
            passedAt: { not: null }
          }
        }
      },
      orderBy: {
        username: 'asc'
      }
    })
  })
})
