import prismaMock from '../../__tests__/utils/prismaMock'
import { validateLessonId } from './validateLessonId'

describe('validateLessonId helper function', () => {
  test('should throw "lessonId does not exist in database" when id does not exist', async () => {
    prismaMock.lesson.findUnique.mockResolvedValue(null)
    await expect(validateLessonId(4)).rejects.toThrow(
      'lessonId does not exist in database'
    )
  })

  test('should throw custom error message when id does not exist, and second parameter is passed in', async () => {
    prismaMock.lesson.findUnique.mockResolvedValue(null)
    await expect(validateLessonId(4, 'ultimate potato')).rejects.toThrow(
      'ultimate potato'
    )
  })

  test('should return true id lessonId exists in database', async () => {
    prismaMock.lesson.findUnique.mockResolvedValue([])
    const res = await validateLessonId(4)
    expect(res).toEqual(true)
  })
})
