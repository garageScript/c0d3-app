/**
 * @jest-environment node
 */

jest.mock('../../helpers/validation/validateLessonId')
jest.mock('./lessons')
import { lessons } from './lessons'
import lessonData from '../../__dummy__/lessonData'
import prismaMock from '../../__tests__/utils/prismaMock'
import { validateLessonId } from '../../helpers/validation/validateLessonId'
import { createLesson, updateLesson } from './lessonsController'

const mockLessonData = {
  lessonId: 5,
  id: 102,
  order: 19,
  description: 'lolz',
  title: 'potato',
  docUrl: '',
  githubUrl: '',
  videoUrl: '',
  chatUrl: ''
}

lessons.mockReturnValue(lessonData)

describe('Lessons controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  beforeEach(() => {
    validateLessonId.mockReturnValue(true)
  })

  test('Should create new lesson', async () => {
    await expect(createLesson(null, mockLessonData, ctx)).resolves.toEqual(
      lessonData
    )
    expect(prismaMock.lesson.create).toBeCalledWith({ data: mockLessonData })
  })

  test('Should update lesson', async () => {
    await expect(updateLesson(null, mockLessonData, ctx)).resolves.toEqual(
      lessonData
    )
    const { id, ...data } = mockLessonData
    expect(prismaMock.lesson.update).toBeCalledWith({ where: { id }, data })
  })

  test('Should throw error if lessonId does not exist \
  in database when updating lesson', async () => {
    validateLessonId.mockRejectedValue(new Error())
    await expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError()
  })
})
