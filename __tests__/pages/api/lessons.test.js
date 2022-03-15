import lessonsAPI from '../../../pages/api/lessons'
import * as getLessons from '../../../graphql/resolvers/lessons'

describe('lessonsAPI', () => {
  const res = {
    setHeader: jest.fn(),
    json: jest.fn(),
    status: jest.fn()
  }

  // needed to mock chaining status and json methods. Ex: res.status(201).json('lol')
  res.status.mockReturnValue(res)
  const req = {}

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
    expect(res.json).toBeCalledWith('Error occured 😮')
  })
})
