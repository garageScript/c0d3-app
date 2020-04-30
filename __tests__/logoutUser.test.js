describe('logoutUser helper function', () => {
  const FAKE_SERVER = 'https://fake_server:3000'
  const OLD_ENV = process.env
  const global = window || global
  let logoutUser

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    process.env = {
      ...OLD_ENV,
      SERVER_URL: FAKE_SERVER
    }

    logoutUser = jest.requireActual('../helpers/logoutUser').default
  })

  afterEach(() => (process.env = OLD_ENV))

  test('Should call fetch with the correct data', async () => {
    global.fetch = jest.fn().mockReturnValue(Promise.resolve(true))

    await logoutUser()

    expect(global.fetch).toBeCalledWith(`${FAKE_SERVER}/signout`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      }
    })
  })

  test('Should return true when fetch status 200', async () => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        status: 200
      })
    )

    const result = await logoutUser()
    expect(result).toEqual(true)
  })

  test('Should return false when fetch status not 200', async () => {
    global.fetch = jest.fn().mockReturnValue(
      Promise.resolve({
        status: 500
      })
    )

    const result = await logoutUser()
    expect(result).toEqual(false)
  })
})
