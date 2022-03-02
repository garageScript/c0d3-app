import nextAuthAPI from '../../../../pages/api/auth/[...nextauth]'

describe('next-auth API', () => {
  test('should be a dummy test', async () => {
    const res = {
      setHeader: jest.fn(),
      json: jest.fn(),
      status: jest.fn()
    }
    const req = {}

    res.status.mockReturnValue(res)

    await nextAuthAPI(req, res)

    expect('dummy').toEqual('dummy')
  })
})
