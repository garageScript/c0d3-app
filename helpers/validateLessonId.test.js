import { validateLessonId } from './validateLessonId'
import { prisma } from '../prisma'

describe('validateLessonId helper function', () => {
  test('should throw "lessonId does not exist in database" when id does not exist', async () => {
    prisma.lesson.findUnique = jest.fn().mockReturnValue(null)
    await expect(validateLessonId(4)).rejects.toThrow(
      'lessonId does not exist in database'
    )
  })

  test('should throw custom error message when id does not exist, and second parameter is passed in', async () => {
    prisma.lesson.findUnique = jest.fn().mockReturnValue(null)
    await expect(validateLessonId(4, 'ultimate potato')).rejects.toThrow(
      'ultimate potato'
    )
  })

  test('should return true id lessonId exists in database', async () => {
    prisma.lesson.findUnique = jest.fn().mockReturnValue([])
    const res = await validateLessonId(4)
    expect(res).toEqual(true)
  })
})
