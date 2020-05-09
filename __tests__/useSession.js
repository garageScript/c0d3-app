jest.mock('swr')
import useSession, { fetcher } from '../helpers/useSession'
import useSWR from 'swr'

describe('useSession helper', () => {
  test('fetcher should return a promise', async () => {
    window.fetch = () => Promise.resolve({ json: () => 5 })
    const data = await fetcher()
    expect(data).toEqual(5)
  })
  test('useSession returns value from SWR fetch', () => {
    const returnValue = {session:null}
    useSWR.mockReturnValue(returnValue)

    expect(useSession()).toEqual(returnValue)
  })
})
