import resolvers from '../graphql/resolvers'
import db from '../helpers/dbload'

describe('resolvers', () => {
  const { Lesson } = db
  test('lessons should return an empty array', async () => {
    Lesson.findAll = jest.fn().mockReturnValue([])
    expect(resolvers.Query.lessons()).toEqual([])
  })
})
