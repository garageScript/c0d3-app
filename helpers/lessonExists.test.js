import { lessonExists } from './lessonExists'
import db from './dbload'
const { Lesson } = db

describe('lessonExists helper function', () => {
  test('should return true when id exists in the database', async () => {
    Lesson.findOne = jest.fn().mockReturnValue(true)
    const res = await lessonExists(5)
    expect(res).toEqual(true)
  })
  test('should return false when id does not exist in the database', async () => {
    Lesson.findOne = jest.fn().mockReturnValue(null)
    const res = await lessonExists(5)
    expect(res).toEqual(false)
  })
})
