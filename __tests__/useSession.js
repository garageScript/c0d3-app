jest.mock('swr')
jest.mock('graphql-request')
import useSession, { fetcher } from '../helpers/useSession'
import useSWR from 'swr'
import { request } from 'graphql-request'

describe('useSession helper', () => {
  test('fetcher should return a promise', async () => {
    request.mockImplementation(() => Promise.resolve(5))
    const data = await fetcher()
    expect(data).toEqual(5)
  })
  test('useSession returns value from SWR fetch', () => {
    const returnValue = { session: null }
    useSWR.mockReturnValue(returnValue)

    expect(useSession()).toEqual(returnValue)
  })
})
