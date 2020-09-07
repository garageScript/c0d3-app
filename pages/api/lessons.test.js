import lessonsAPI from './lessons'
import noop from '../../helpers/noop'
import * as getLessons from '../../graphql/queryResolvers/lessons'

getLessons.lessons = jest.fn().mockReturnValue([1, 2, 3])

describe('lessonsAPI', () => {
  const res = {
    json: jest.fn(noop),
    status: jest.fn(noop)
  }

  test('should respond with 200 status code', async () => {
    await lessonsAPI(null, res)
    expect(res.status).toBeCalledWith(200)
  })

  test('should respond with json data from getLessons.lessons', async () => {
    await lessonsAPI(null, res)
    expect(res.json).toBeCalledWith([1, 2, 3])
  })
})
