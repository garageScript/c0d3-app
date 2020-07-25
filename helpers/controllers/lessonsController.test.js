jest.mock('../dbload')
jest.mock('../mattermost')
import db from '../dbload'
import { createLesson, updateLesson } from './lessonsController'
import lessonData from '../../__dummy__/lessonData'
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

Lesson.findAll = jest.fn().mockReturnValue(lessonData)
Lesson.update = jest.fn().mockReturnValue(() => {})
Lesson.build = jest.fn().mockReturnValue({ save: () => {} })
describe('Lessons controller tests', () => {
  const ctx = {
    req: {
      user: { isAdmin: 'true' }
    }
  }

  test('Should create new lesson', async () => {
    expect(createLesson(null, mockLessonData, ctx)).resolves.toEqual(lessonData)
  })

  test('Should update lesson', async () => {
    expect(updateLesson(null, mockLessonData, ctx)).resolves.toEqual(lessonData)
  })

  test('Should throw Error when user is not an admin when updating lesson', async () => {
    ctx.req.user.isAdmin = 'false'
    expect(updateLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })

  test('Should throw Error when user is not an admin when creating lesson', async () => {
    ctx.req.user.isAdmin = 'false'
    expect(createLesson(null, mockLessonData, ctx)).rejects.toThrowError(
      'User is not an admin'
    )
  })
})
