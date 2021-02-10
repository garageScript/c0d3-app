jest.mock('../../helpers/dbload')
jest.mock('../../helpers/validateLessonId')
import { getLessonMentors } from './getLessonMentors'
import { User, UserLesson } from '../../helpers/dbload'
import { validateLessonId } from '../../helpers/validateLessonId'
describe('getLessonMentors resolver', () => {
  beforeEach(() => {
    validateLessonId.mockReturnValue(true)
  })

  test('should return an array of User objects', async () => {
    UserLesson.findAll = jest.fn().mockReturnValue([
      { user: { username: 'user1', name: 'lol', id: 2 } },
      {
        user: {
          username: 'user2',
          name: 'potato',
          id: 240
        }
      }
    ])
    const res = await getLessonMentors(null, { lessonId: '3' })
    expect(res).toEqual([
      { username: 'user1', name: 'lol', id: 2 },
      { username: 'user2', name: 'potato', id: 240 }
    ])
    expect(UserLesson.findAll).toHaveBeenCalledWith({
      where: { lessonId: '3' },
      include: [
        { model: User, as: 'user', attributes: ['username', 'name', 'id'] }
      ]
    })
  })

  test('Should throw error if lessonId does not exist \
  in database when updating lesson', async () => {
    validateLessonId.mockImplementation(() => {
      throw new Error()
    })
    await expect(
      getLessonMentors(null, { lessonId: '3' })
    ).rejects.toThrowError()
  })

  test('should throw an error', async () => {
    UserLesson.findAll = jest.fn().mockImplementation(() => {
      throw new Error()
    })
    //rejects: checks for promise rejection
    //which would be the case if an error was thrown in a Promise
    await expect(getLessonMentors(null, { lessonId: '3' })).rejects.toThrow()
  })
})
