import { getLessonMentors } from './getLessonMentors'
import db from '../../helpers/dbload'

const mockValue = [
  {
    User: 'user1'
  },
  {
    User: 'user2'
  }
]
const mockReturnValue = ['user1', 'user2']
const emptyMockReturnValue = []

const args = {
  lessonId: '3'
}

describe('getLessonMentors resolver', () => {
  const { UserLesson } = db

  test('should return an array of Users', async () => {
    UserLesson.findAll = jest.fn().mockReturnValue(mockValue)
    const res = await getLessonMentors(null, args)
    expect(res).toEqual(mockReturnValue)
  })

  test('should return null for empty results', async () => {
    UserLesson.findAll = jest.fn().mockReturnValue(emptyMockReturnValue)
    const res = await getLessonMentors(null, args)
    expect(res).toBeNull()
  })

  test('should throw an error', async () => {
    UserLesson.findAll = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    //rejects: checks for promise rejection
    //which would be the case if an error was thrown in a Promise
    await expect(getLessonMentors(null, args)).rejects.toThrow()
  })
})

/*
 * TODO
 * Does it return the correct users based on id?
 * */
