import lessonsAPI from './lessons'
import noop from '../../helpers/noop'
import * as getLessons from '../../graphql/queryResolvers/lessons'

describe('lessonsAPI', () => {
  const res = {
    json: jest.fn(noop),
    status: jest.fn(noop)
  }

  getLessons.lessons = jest
    .fn()
    .mockReturnValue(['man', 'bear', 'pig', 'manbearpig'])

  test('should respond with 200 status code when there is no error', async () => {
    await lessonsAPI(null, res)
    expect(res.status).toBeCalledWith(200)
  })

  test('should respond with json data from lessons() when there is no error', async () => {
    await lessonsAPI(null, res)
    expect(res.json).toBeCalledWith(['man', 'bear', 'pig', 'manbearpig'])
  })

  test('should respond with 500 status code when there is an error', async () => {
    getLessons.lessons = jest.fn().mockImplementation(() => {
      throw new Error('Error')
    })
    await lessonsAPI(null, res)
    expect(res.status).toBeCalledWith(500)
  })

  test('should respond with error message when there is an error', async () => {
    getLessons.lessons = jest.fn().mockImplementation(() => {
      throw new Error('Error occured :(')
    })
    await lessonsAPI(null, res)
    expect(res.json).toBeCalledWith('Error occured :(')
  })
})
