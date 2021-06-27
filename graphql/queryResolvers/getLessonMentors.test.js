/**
 * @jest-environment node
 */

jest.mock('../../helpers/validateLessonId')
import { getLessonMentors } from './getLessonMentors'
import { validateLessonId } from '../../helpers/validateLessonId'
import { prisma } from '../../prisma'
describe('getLessonMentors resolver', () => {
  beforeEach(() => {
    validateLessonId.mockReturnValue(true)
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
    prisma.user.findMany = jest.fn().mockReturnValue(users)
    const res = await getLessonMentors(null, { lessonId: 3 })
    expect(res).toEqual(users)
    expect(prisma.user.findMany).toHaveBeenCalledWith({
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
            isPassed: { not: null }
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
    validateLessonId.mockImplementation(() => {
      throw new Error()
    })
    expect(getLessonMentors(null, { lessonId: 3 })).rejects.toThrowError()
  })

  test('should throw an error', () => {
    prisma.user.findMany = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    //rejects: checks for promise rejection
    //which would be the case if an error was thrown in a Promise
    expect(getLessonMentors(null, { lessonId: '3' })).rejects.toThrow()
  })

  test('should include userId in the query if session exists', async () => {
    prisma.user.findMany = jest
      .fn()
      .mockReturnValue([{ username: 'user1', name: 'lol', id: 2 }])
    const res = await getLessonMentors(
      null,
      { lessonId: 3 },
      { req: { user: { id: 1 } } }
    )
    expect(res).toEqual([{ username: 'user1', name: 'lol', id: 2 }])
    expect(prisma.user.findMany).toHaveBeenCalledWith({
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
            isPassed: { not: null }
          }
        }
      },
      orderBy: {
        username: 'asc'
      }
    })
  })
})
