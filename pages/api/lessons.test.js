import lessonsAPI from './lessons'
import noop from '../../helpers/noop'
import { lessons } from '../../graphql/queryResolvers/lessons'
lessons = jest.fn().mockReturnValue(['man', 'bear', 'pig', 'manbearpig'])

describe('lessonsAPI', () => {
  const res = {
    json: jest.fn(noop),
    status: jest.fn(noop)
  }

  const req = null

  test('should respond with 200 status code when there is no error', async () => {
    await lessonsAPI(req, res)
    expect(res.status).toBeCalledWith(200)
  })

  test('should respond with json data from lessons() when there is no error', async () => {
    await lessonsAPI(req, res)
    expect(res.json).toBeCalledWith(['man', 'bear', 'pig', 'manbearpig'])
  })
})
