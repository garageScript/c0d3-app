import lessonsAPI from './lessons'
import noop from '../../helpers/noop'
import * as getLessons from '../../graphql/queryResolvers/lessons'

describe('lessonsAPI', () => {
  const res = {
    json: jest.fn(noop),
    status: jest.fn(noop)
  }

  const req = null

  test('should respond with data from lessons query resolver when there is no \
	error', async () => {
    getLessons.lessons = jest
      .fn()
      .mockReturnValue(['man', 'bear', 'pig', 'manbearpig'])

    await lessonsAPI(req, res)
    expect(res.json).toBeCalledWith(['man', 'bear', 'pig', 'manbearpig'])
  })

  test('should respond with 500 status code and display error message when \
	there is an error', async () => {
    getLessons.lessons = jest.fn().mockImplementation(() => {
      throw new Error()
    })

    await lessonsAPI(req, res)
    expect(res.status).toBeCalledWith(500)
    expect(res.json).toBeCalledWith('Error occured :(')
  })
})
