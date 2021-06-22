/**
 * @jest-environment node
 */

jest.mock('../mattermost')
jest.mock('../validateLessonId')
jest.mock('../../graphql/queryResolvers/lessons')
import { lessons } from '../../graphql/queryResolvers/lessons'
import { prisma } from '../../prisma'
import lessonData from '../../__dummy__/lessonData'
import { validateLessonId } from '../validateLessonId'
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
prisma.lesson.update = jest.fn()
prisma.lesson.create = jest.fn()

describe('Lessons controller tests', () => {
  beforeEach(() => {
    validateLessonId.mockReturnValue(true)
  })
  const ctx = {
    req: {
      user: { isAdmin: true }
    }
  }

  test('Should create new lesson', async () => {
    await expect(createLesson(null, mockLessonData, ctx)).resolves.toEqual(
      lessonData
    )
  })

  test('Should update lesson', async () => {
    await expect(updateLesson(null, mockLessonData, ctx)).resolves.toEqual(
      lessonData
    )
  })

  test('Should throw error if lessonId does not exist \
  in database when updating lesson', async () => {
    validateLessonId.mockImplementation(() => {
      throw new Error()
    })
    await expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError()
  })

  test('Should throw "User is not an admin" error when user is not an admin when updating lesson', async () => {
    ctx.req.user.isAdmin = false
    await expect(createLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })

  test('Should throw "User is not an admin" error when user is not an admin when creating lesson', async () => {
    ctx.req.user.isAdmin = false
    await expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
