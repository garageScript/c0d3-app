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
})
