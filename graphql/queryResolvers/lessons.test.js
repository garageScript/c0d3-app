import { lessons } from './lessons'
import db from '../../helpers/dbload'

describe('Lessons resolver', () => {
  const { Lesson } = db

  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(lessons()).toEqual([])
  })
})
