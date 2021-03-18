import { validateLessonId } from '../validateLessonId'
import { validateStudentId } from './validateStudentId'

describe('validateStudentId helper function', () => {
  test('should throw "StudentId is not logged in" when id does not exist', () => {
    let res = ''
    try {
      validateStudentId({})
    } catch (err) {
      res = String(err)
    }
    expect(res).toContain('Student is not logged in')
  })

  test('should throw custom error message when id does not exist, and second parameter is passed in', () => {
    let res = ''
    try {
      validateStudentId({}, 'ultimate potato')
    } catch (err) {
      res = String(err)
    }
    expect(res).toContain('ultimate potato')
  })

  test('should return studentId if StudentId exists in database', () => {
    const res = validateStudentId({ user: { id: 4 } })
    expect(res).toEqual(4)
  })
})
