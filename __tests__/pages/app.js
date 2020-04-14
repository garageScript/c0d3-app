jest.mock('swr')
jest.mock('@apollo/react-hooks', () => ({
  __esModule: true,
  ApolloProvider: jest.fn(() => (
    <h1>Apollo Provider</h1>
  ))
}))
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App, { fetcher } from '../../pages/_app'
import useSWR from 'swr'

afterEach(cleanup)

describe('App', () => {
  test('fetcher should return a promise', async () => {
    window.fetch = () => Promise.resolve({json: () => 5})
    const data = await fetcher()
    expect(data).toEqual(5)
  })

  test('Should render loading if no data', () => {
    useSWR.mockReturnValue({ data: false })

    const { getByText } = render(<App />)
    getByText('Loading')
  })

  test('Should render provider when data is present', () => {
    useSWR.mockReturnValue({ data: true })

    const { getByText } = render(<App />)
    getByText('Apollo Provider')
  })
})
