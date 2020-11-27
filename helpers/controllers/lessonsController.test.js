jest.mock('../dbload')
jest.mock('../mattermost')
jest.mock('../lessonExists')
jest.mock('../../graphql/queryResolvers/lessons')
import db from '../dbload'
import { createLesson, updateLesson } from './lessonsController'
import lessonData from '../../__dummy__/lessonData'
import { lessonExists } from '../lessonExists'
import { lessons } from '../../graphql/queryResolvers/lessons'

lessons.mockReturnValue(lessonData)
const { Lesson } = db

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

Lesson.findAll.mockReturnValue(lessonData)
Lesson.update.mockReturnValue(() => {})
Lesson.build.mockReturnValue({ save: () => {} })

describe('Lessons controller tests', () => {
  beforeEach(() => {
    lessonExists.mockReturnValue(true)
  })
  const ctx = {
    req: {
      user: { isAdmin: 'true' }
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

  test('Should throw "lessonId does not exist" error if lessonId does not exist \
  in database when updating lesson', async () => {
    lessonExists.mockReturnValue(false)
    await expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'lessonId does not exist in database'
    )
  })

  test('Should throw Error when user is not an admin when updating lesson', async () => {
    ctx.req.user.isAdmin = 'false'
    await expect(createLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })

  test('Should throw Error when user is not an admin when creating lesson', async () => {
    ctx.req.user.isAdmin = 'false'
    await expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
