jest.mock('../../helpers/dbload')
import { getLessonMentors } from './getLessonMentors'
import { User, UserLesson } from '../../helpers/dbload'

describe('getLessonMentors resolver', () => {
  test('should return an array of usernames', async () => {
    UserLesson.findAll = jest
      .fn()
      .mockReturnValue([
        { User: { username: 'user1', email: 'abc@mail' } },
        { User: { username: 'user2', email: 'xyz@mail' } }
      ])
    const res = await getLessonMentors(null, { lessonId: '3' })
    expect(res).toEqual([{ username: 'user1' }, { username: 'user2' }])
    expect(UserLesson.findAll).toHaveBeenCalledWith({
      where: { lessonId: '3' },
      include: [{ model: User }]
    })
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
